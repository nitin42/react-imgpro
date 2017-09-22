import React, { Component } from 'react';
import ProgressiveImage from 'react-progressive-image';
import size from 'browser-image-size';
import work from 'webworkify-webpack';
import root from 'window-or-global';
import { filterPropsToListen, getImageProps } from '../utils/propsFactory';
import getSize from '../utils/getDimensions';
import { noJimpInstance, webWorkerInfo } from '../utils/errorMsg';
import { setItem, getItem, removeItem } from '../utils/storage';
import ROOT from '../utils/build';
import MainPropTypes from '../validators/props';

const processImage = require('../utils/options');

class ProcessImage extends Component {
  static propTypes = MainPropTypes;

  static defaultProps = {
    storage: true,
    greyscale: false,
    normalize: false,
    invert: false,
    opaque: false,
    sepia: false,
    dither565: false,
    disableWebWorker: false,
  };

  state = {
    src: '',
    err: '',
    height: null,
    width: null,
  };

  componentWillMount = () => {
    // check support for Storage and get a reference to it
    this.checkStorageSupport();

    // Check the support for web worker and create a new worker if supported
    if (typeof Worker !== 'undefined' && !this.props.disableWebWorker) {
      // webworkify-webpack (same bundle on both browser and web worker environment)
      this.worker = work(require.resolve('../worker.js'));
      // this.worker = new NewWorker();

      // Send image filter props to worker
      this.sendPropsToWorker(this.props, this.worker);
    }
  };

  componentDidMount = () => {    
    // Get original size of the image
    this.getOriginalImageSize(this.props);

    // Process the image in main thread (if no web worker support) or in a web worker
    this.processInMainThreadOrInWebWorker(this.worker, this.props, this.myStorage);
  };

  componentWillUnmount = () => {
    // Terminate worker (though worker is closed after the image processing is done)
    this.worker !== null ? this.worker.terminate() : null;

    // Clear storage
    removeItem('placeholder', this.myStorage);
  };

  // Check the support for Storage
  checkStorageSupport = () => {
    if (typeof Storage !== 'undefined' && this.props.storage) {
      // Get a reference to localStorage
      return (this.myStorage = root.localStorage);
    } else if (!this.props.storage && typeof Storage !== 'undefined') {
      // Clear the cache before updating the storage prop
      this.clearStorage();
      // Don't use the localStorage
      return (this.myStorage = null);
    }
    // Fallback
    return (this.myStorage = null);
  };

  // Pass the new image to parent
  passPropsToParent = (props, src, err) => (props.processedImage !== undefined ? props.processedImage(src, err) : null);

  processInMainThreadOrInWebWorker = (worker, props, storageReference) => {
    if (typeof Worker !== 'undefined' && !props.disableWebWorker) {
      return this.processInWebWorker(worker, props, storageReference);
    } else {
      if (ROOT !== undefined && props.disableWebWorker) {
        console.info(webWorkerInfo);
        return this.processInMainThread(props);
      } else {
        return console.error(noJimpInstance);
      }
    }
  };

  // Clear the cache
  clearStorage = () => root.localStorage.removeItem('placeholder');

  /**
   * Get the orginal size of the image
   * @param { object } props image props
   */
  getOriginalImageSize = props => {
    size(props.image).then(size => this.setState({ height: size.height, width: size.width }));
  };

  /**
   * Set the image size
   * @param { object } props Component props
   */
  getDefaultImageSize = props => {
    const { height, width } = this.state;

    return {
      height: getSize(props, height, 'height'),
      width: getSize(props, width, 'width'),
    };
  };

  // localStorage reference
  myStorage = null;

  // Process the image in main thread if no support for web worker
  processInMainThread = props => {
    ROOT.read(props.image).then(image => {
      processImage(image, props, ROOT).getBase64(ROOT.AUTO, (err, src) => {
        this.setState({ src, err });
        this.passPropsToParent(props, src, err);
      });
    });
  };

  processInWebWorker = (worker, props, storageReference) => {
    // Get the data from worker
    if (worker !== null) {
      worker.onmessage = e => {
        // Set the processed image
        this.setState({ src: e.data.src, err: e.data.err });
        // Store the image in localStorage (cache is cleared when storage prop is set to false)
        setItem('placeholder', e.data.src, storageReference);
        this.passPropsToParent(props, e.data.src, e.data.err);
      };
    }
  };

  /**
   * Send the image filter props and image to worker script
   * @param { object } props image filter props
   * @param { worker } props worker instance
   */
  sendPropsToWorker = (props, worker) => {
    if (worker !== null) {
      worker.postMessage({ props: filterPropsToListen(props), image: props.image });
    }
  };

  // web worker reference
  worker = null;

  /**
   * Display the processed image
   * @param { string } image Image
   * @param { object } restProps remaining props
   * @param { object } style image styles
   */
  processedImage = (image, restProps, style) => <img src={image} {...restProps} style={style} />;

  /**
   * Set the placeholder image
   * @param { string } image Image
   */
  placeholderImage = image =>
    getItem('placeholder', this.myStorage) === null ? image : getItem('placeholder', this.myStorage);

  /**
   * Display the image
   * @param { string } img Image
   * @param { object } props Image props
   * @param { object } restProps remaining props
   */
  showImage = (img, props, restProps) => (
    <ProgressiveImage src={img} placeholder={this.placeholderImage(props.image)}>
      {image => this.processedImage(image, restProps, this.getDefaultImageSize(props))}
    </ProgressiveImage>
  );

  render() {
    const { src } = this.state;
    const restProps = getImageProps(this.props);

    return this.showImage(src, this.props, restProps);
  }
}

export default ProcessImage;
