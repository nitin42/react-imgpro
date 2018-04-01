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
    colors
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
    colors
  };
};

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
