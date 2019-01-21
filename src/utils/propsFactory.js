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
    crop,
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
    background
  } = props;

  return {
    resize,
    quality,
    greyscale,
    contain,
    cover,
    crop,
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
    background
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
    crop,
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
    disableRerender,
    customCdn,
    onProcessFinish,
    background,
    ...rest
  } = props;

  return rest;
};

export { filterPropsToListen, getImageProps };
