const { ALIGN_MODES, RESIZE_MODES } = require('./modes');

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

  function MODE(algorithm) {
    return ROOT[algorithm];
  }

  function getMode(prop, modes) {
    return prop !== undefined ? modes[prop.mode] : null;
  }

  function setMode(prop, modes, autoMode) {
    return MODE(getMode(prop, modes)) || autoMode;
  }

  const AUTOMEASURE = ROOT.AUTO;

  const setter = (value, fallbackTo) => (value !== undefined ? value : fallbackTo);

  image.__proto__.pass = function(image) {
    return image;
  };

  function setFilterOrForwardTheImage(filter, img, fn) {
    return filter ? img[fn]() : image.pass(img);
  }

  function scaleImageWithoutMode(prop, img, scaleMode) {
    return prop !== undefined && Object.keys(prop).length > 0
      ? img[scaleMode](prop.width, prop.height, setMode(prop, ALIGN_MODES, ROOT.HORIZONTAL_ALIGN_CENTER))
      : image.pass(image);
  }

  function changeImageAppearence(prop, img, filter) {
    return prop !== undefined ? img[filter](prop) : image.pass(img);
  }

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

  image.__proto__.resizeAnImage = function(image, resize) {
    return resize !== undefined && Object.keys(resize).length > 0
      ? image.resize(
          setter(resize.width, AUTOMEASURE),
          setter(resize.height, AUTOMEASURE),
          setMode(resize, RESIZE_MODES, ROOT.RESIZE_BILINEAR)
        )
      : image.pass(image);
  };

  image.__proto__.changeImageQuality = function(image, quality) {
    return changeImageAppearence(quality, image, 'quality');
  };

  image.__proto__.applyGreyscale = function(image, greyscale) {
    return setFilterOrForwardTheImage(greyscale, image, 'greyscale');
  };

  image.__proto__.normalizeImage = function(image, normalize) {
    return setFilterOrForwardTheImage(normalize, image, 'normalize');
  };

  image.__proto__.invertImage = function(image, invert) {
    return setFilterOrForwardTheImage(invert, image, 'invert');
  };

  image.__proto__.opaqueImage = function(image, opaque) {
    return setFilterOrForwardTheImage(opaque, image, 'opaque');
  };

  image.__proto__.sepiaFilter = function(image, sepia) {
    return setFilterOrForwardTheImage(sepia, image, 'sepia');
  };

  image.__proto__.ditherFilter = function(image, dither565) {
    return setFilterOrForwardTheImage(dither565, image, 'dither565');
  };

  image.__proto__.scaleImage = function(image, scale) {
    return changeImageAppearence(scale, image, 'scale');
  };

  image.__proto__.scaleToFitImage = function(image, scaleToFit) {
    return scaleToFit !== undefined
      ? image.scaleToFit(setter(scaleToFit.width, AUTOMEASURE), setter(scaleToFit.height, AUTOMEASURE))
      : image.pass(image);
  };

  image.__proto__.flipImage = function(image, flip) {
    return flip !== undefined
      ? image.flip(setter(flip.horizontal, false), setter(flip.vertical, false))
      : image.pass(image);
  };

  image.__proto__.rotateImage = function(image, rotate) {
    return rotate !== undefined
      ? image.rotate(setter(rotate.degree, 0), setMode(rotate, RESIZE_MODES, false))
      : image.pass(image);
  };

  image.__proto__.changeBrightness = function(image, brightness) {
    return changeImageAppearence(brightness, image, 'brightness');
  };

  image.__proto__.changeContrast = function(image, contrast) {
    return changeImageAppearence(contrast, image, 'contrast');
  };

  image.__proto__.fadeImage = function(image, fade) {
    return changeImageAppearence(fade, image, 'fade');
  };

  image.__proto__.changeOpacity = function(image, opacity) {
    return changeImageAppearence(opacity, image, 'opacity');
  };

  image.__proto__.blurImage = function(image, blur) {
    return changeImageAppearence(blur, image, 'blur');
  };

  image.__proto__.posterizeImage = function(image, posterize) {
    return changeImageAppearence(posterize, image, 'posterize');
  };

  image.__proto__.containImage = function(image, contain) {
    return scaleImageWithoutMode(contain, image, 'contain');
  };

  image.__proto__.coverImage = function(image, cover) {
    return scaleImageWithoutMode(cover, image, 'cover');
  };

  return image
    .clone()
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
