/**
 * Returns an object of image filter props
 * @param { object } props Component props
 */
const filterPropsToListen = props => {
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
    colors,
  } = props;

  return {
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
    colors,
  };
};

/**
 * Returns the rest of the props of the image component like className, alt
 * @param { object } props Component props
 */
const getImageProps = props => {
  const {
    image,
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
    colors,
    placeholder,
    processedImage,
    storage,
    disableWebWorker,
    ...rest
  } = props;

  return rest;
};

export { filterPropsToListen, getImageProps };
