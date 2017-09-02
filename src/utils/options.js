const { ALIGN_MODES, RESIZE_MODES } = require('./modes');

/**
 * Process the image and generate a base64 string
 * @param { string } image Image
 * @param { object } props Image filter props
 * @param { function } ROOT Jimp instance
 */
function processImage(image, props, ROOT) {
  const {
    resize,
    quality,
    greyscale,
    contain,
    cover,
    normalize,
    invert,
    opaque,
    sepia,
    dither565,
    scale,
    scaleToFit,
    flip,
    rotate,
    brightness,
    contrast,
    fade,
    opacity,
    blur,
    posterize,
  } = props;

  /**
   * Get the algorithm from Jimp instance
   * @param { string } algorithm Algorithm for resize, contain and cover props
   */
  function MODE(algorithm) {
    return ROOT[algorithm];
  }

  /**
   * Get the mode from prop
   * @param { object } prop filter prop
   * @param { array } modes array of modes
   */
  function getMode(prop, modes) {
    return prop !== undefined ? modes[prop.mode] : null;
  }

  /**
   * Set the mode
   * @param { object } prop filter prop
   * @param { array } modes array of modes
   * @param { number } autoMode
   */
  function setMode(prop, modes, autoMode) {
    return MODE(getMode(prop, modes)) || autoMode;
  }

  // Automatically measure the dimension
  const AUTOMEASURE = ROOT.AUTO;

  /**
   * Setter for image attribute
   * @param { any } value attribute
   * @param { any } fallbackTo fallback value
   */
  const setter = (value, fallbackTo) => (value !== undefined ? value : fallbackTo);

  /**
   * Pass the image
   */
  image.__proto__.pass = function(image) {
    return image;
  };

  /**
   * Apply filter on the image or pass the image
   * @param { boolean } filter fiter value
   * @param { object } img Jimp image
   * @param { string } fn filter name
   */
  function setFilterOrForwardTheImage(filter, img, fn) {
    return filter ? img[fn]() : image.pass(img);
  }

  /**
   * Scale the image (contain and cover)
   * @param { object } prop prop value
   * @param { object } img Jimp image
   * @param { string } scaleMode contain or cover
   */
  function scaleImageWithoutMode(prop, img, scaleMode) {
    return prop !== undefined && Object.keys(prop).length > 0
      ? img[scaleMode](prop.width, prop.height, setMode(prop, ALIGN_MODES, ROOT.HORIZONTAL_ALIGN_CENTER))
      : image.pass(image);
  }

  /**
   * Changes the appearence of the image
   * @param { number } prop filter value
   * @param { object } img Jimp image
   * @param { string } filter filter name
   */
  function changeImageAppearence(prop, img, filter) {
    return prop !== undefined ? img[filter](prop) : image.pass(img);
  }

  /**
   * Manipulate the colors
   * @param { object } props color props
   */
  function colorManipulation(props) {
    const setConfig = [];

    if (props.colors !== undefined) {
      Object.keys(props.colors).forEach(option => {
        const setAmountWithColor = ['mix', 'xor'];

        if (setAmountWithColor.includes(option)) {
          const schemaOne = {
            apply: option,
            params: [props.colors[option].color, props.colors[option].amount],
          };

          setConfig.push(schemaOne);
        }

        const schemaTwo = {
          apply: option,
          params: [props.colors[option]],
        };

        setConfig.push(schemaTwo);
      });
      return setConfig;
    }

    return [];
  }

  // This function resizes the image with given dimensions
  image.__proto__.resizeAnImage = function(image, resize) {
    return resize !== undefined && Object.keys(resize).length > 0
      ? image.resize(
          setter(resize.width, AUTOMEASURE),
          setter(resize.height, AUTOMEASURE),
          setMode(resize, RESIZE_MODES, ROOT.RESIZE_BILINEAR)
        )
      : image.pass(image);
  };

  // This function changes the quality of the image
  image.__proto__.changeImageQuality = function(image, quality) {
    return changeImageAppearence(quality, image, 'quality');
  };

  // This function applies greyscale
  image.__proto__.applyGreyscale = function(image, greyscale) {
    return setFilterOrForwardTheImage(greyscale, image, 'greyscale');
  };

  // This function normalizes the image
  image.__proto__.normalizeImage = function(image, normalize) {
    return setFilterOrForwardTheImage(normalize, image, 'normalize');
  };

  // This function inverts the image color
  image.__proto__.invertImage = function(image, invert) {
    return setFilterOrForwardTheImage(invert, image, 'invert');
  };

  // This function makes the image opaque
  image.__proto__.opaqueImage = function(image, opaque) {
    return setFilterOrForwardTheImage(opaque, image, 'opaque');
  };

  // This function applies sepia filter to the image
  image.__proto__.sepiaFilter = function(image, sepia) {
    return setFilterOrForwardTheImage(sepia, image, 'sepia');
  };

  // dither565
  image.__proto__.ditherFilter = function(image, dither565) {
    return setFilterOrForwardTheImage(dither565, image, 'dither565');
  };

  // This function scales the image by n levels
  image.__proto__.scaleImage = function(image, scale) {
    return changeImageAppearence(scale, image, 'scale');
  };

  // This function scales the image with given dimensions
  image.__proto__.scaleToFitImage = function(image, scaleToFit) {
    return scaleToFit !== undefined
      ? image.scaleToFit(setter(scaleToFit.width, AUTOMEASURE), setter(scaleToFit.height, AUTOMEASURE))
      : image.pass(image);
  };

  // This functon flips the image (horizontally or vertically)
  image.__proto__.flipImage = function(image, flip) {
    return flip !== undefined
      ? image.flip(setter(flip.horizontal, false), setter(flip.vertical, false))
      : image.pass(image);
  };

  // This function rotates the image by a degree and mode
  image.__proto__.rotateImage = function(image, rotate) {
    return rotate !== undefined
      ? image.rotate(setter(rotate.degree, 0), setMode(rotate, RESIZE_MODES, false))
      : image.pass(image);
  };

  // This function changes the brightness of the image
  image.__proto__.changeBrightness = function(image, brightness) {
    return changeImageAppearence(brightness, image, 'brightness');
  };

  // This function changes the contrast level of the image
  image.__proto__.changeContrast = function(image, contrast) {
    return changeImageAppearence(contrast, image, 'contrast');
  };

  // This function fades the image by a factor
  image.__proto__.fadeImage = function(image, fade) {
    return changeImageAppearence(fade, image, 'fade');
  };

  // This function change the level of opacity of the image
  image.__proto__.changeOpacity = function(image, opacity) {
    return changeImageAppearence(opacity, image, 'opacity');
  };

  // This function blurs the image by a factor
  image.__proto__.blurImage = function(image, blur) {
    return changeImageAppearence(blur, image, 'blur');
  };

  // This function applies a posterization effect (like Prisma ?)
  image.__proto__.posterizeImage = function(image, posterize) {
    return changeImageAppearence(posterize, image, 'posterize');
  };

  // Scales the image but some part of an image may be boxed
  image.__proto__.containImage = function(image, contain) {
    return scaleImageWithoutMode(contain, image, 'contain');
  };

  // Scales an image but some part of the image may be clipped
  image.__proto__.coverImage = function(image, cover) {
    return scaleImageWithoutMode(cover, image, 'cover');
  };

  // Applies the image filter or pass the image to generate base64 (blob) if no filters are applied
  return image
    .clone() // Don't mutate the original image buffer
    .resizeAnImage(image, resize)
    .changeImageQuality(image, quality)
    .applyGreyscale(image, greyscale)
    .normalizeImage(image, normalize)
    .invertImage(image, invert)
    .opaqueImage(image, opaque)
    .sepiaFilter(image, sepia)
    .ditherFilter(image, dither565)
    .scaleImage(image, scale)
    .scaleToFitImage(image, scaleToFit)
    .flipImage(image, flip)
    .rotateImage(image, rotate)
    .changeBrightness(image, brightness)
    .changeContrast(image, contrast)
    .fadeImage(image, fade)
    .changeOpacity(image, opacity)
    .blurImage(image, blur)
    .posterizeImage(image, posterize)
    .coverImage(image, cover)
    .color(colorManipulation(props))
    .containImage(image, contain);
}

module.exports = processImage;
