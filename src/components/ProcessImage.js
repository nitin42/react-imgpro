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
import worker from 'workerize-loader!../worker';

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
    disableWebWorker: false
  };

  state = {
    src: '',
    err: '',
    height: null,
    width: null
  };

  componentWillMount = () => {
    this.checkStorageSupport();

    if (typeof Worker !== 'undefined' && !this.props.disableWebWorker) {
      this.worker = worker();
    }
  };

  componentDidMount = () => {
    this.getOriginalImageSize(this.props);

    this.processInMainThreadOrInWebWorker(
      this.worker,
      this.props,
      this.myStorage
    );
  };

  componentDidUpdate = () => {
    if (this.props.image && !this.props.disableRerender) {
      this.processInMainThreadOrInWebWorker(
        this.worker,
        this.props,
        this.myStorage
      );
    }
  };

  componentWillUnmount = () => {
    this.worker !== null ? this.worker.terminate() : null;

    removeItem('placeholder', this.myStorage);
  };

  checkStorageSupport = () => {
    if (typeof Storage !== 'undefined' && this.props.storage) {
      return (this.myStorage = root.localStorage);
    } else if (!this.props.storage && typeof Storage !== 'undefined') {
      this.clearStorage();
      return (this.myStorage = null);
    }

    return (this.myStorage = null);
  };

  passPropsToParent = (props, src, err) =>
    props.processedImage !== undefined ? props.processedImage(src, err) : null;

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

  clearStorage = () => root.localStorage.removeItem('placeholder');

  getOriginalImageSize = props => {
    size(props.image).then(size =>
      this.setState({ height: size.height, width: size.width })
    );
  };

  getDefaultImageSize = props => {
    const { height, width } = this.state;

    return {
      height: getSize(props, height, 'height'),
      width: getSize(props, width, 'width')
    };
  };

  myStorage = null;

  processInMainThread = props => {
    ROOT.read(props.image).then(image => {
      processImage(image, props, ROOT).getBase64(ROOT.AUTO, (err, src) => {
        if (this.state.src !== src || this.state.err !== err) {
          this.setState({ src, err });
          this.passPropsToParent(props, src, err);
          if (typeof props.onProcessFinish === 'function') {
            props.onProcessFinish();
          }
        }
      });
    });
  };

  processInWebWorker = async (worker, props, storageReference) => {
    if (worker !== null) {
      const result = await worker.process({
        props: filterPropsToListen(props),
        image: props.image
      });
      if (result.src !== this.state.src || result.err !== this.state.err) {
        this.setState({ src: result.src, err: result.err });
        setItem('placeholder', result.src, storageReference);
        this.passPropsToParent(props, result.src, result.err);
        if (typeof props.onProcessFinish === 'function') {
          props.onProcessFinish();
        }
      }
    }
  };

  worker = null;

  processedImage = (image, restProps, style) => (
    <img src={image} {...restProps} style={style} />
  );

  placeholderImage = image =>
    getItem('placeholder', this.myStorage) === null
      ? image
      : getItem('placeholder', this.myStorage);

  showImage = (img, props, restProps) => (
    <ProgressiveImage
      src={img}
      placeholder={this.placeholderImage(props.image)}
    >
      {image =>
        this.processedImage(image, restProps, this.getDefaultImageSize(props))
      }
    </ProgressiveImage>
  );

  render() {
    const { src } = this.state;
    const restProps = getImageProps(this.props);
    return this.showImage(src, this.props, restProps);
  }
}

export default ProcessImage;
