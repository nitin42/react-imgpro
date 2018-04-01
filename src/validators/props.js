import PropTypes from 'prop-types';

const resizePropType = PropTypes.shape({
  width: PropTypes.number,
  height: PropTypes.number,
  mode: PropTypes.string
});

const containPropType = PropTypes.shape({
  width: PropTypes.number,
  height: PropTypes.number,
  mode: PropTypes.string
});

const coverPropType = PropTypes.shape({
  width: PropTypes.number,
  height: PropTypes.number,
  mode: PropTypes.string
});

const scaleToFitPropType = PropTypes.shape({
  width: PropTypes.number,
  height: PropTypes.number
});

const flipPropType = PropTypes.shape({
  horizontal: PropTypes.bool,
  vertical: PropTypes.bool
});

const rotatePropType = PropTypes.shape({
  degree: PropTypes.number,
  mode: PropTypes.string
});

const mixPropType = PropTypes.shape({
  color: PropTypes.string,
  amount: PropTypes.number
});

const xorPropType = PropTypes.shape({
  color: PropTypes.string,
  amount: PropTypes.number
});

const colorsPropType = PropTypes.shape({
  lighten: PropTypes.number,
  brighten: PropTypes.number,
  darken: PropTypes.number,
  desaturate: PropTypes.number,
  saturate: PropTypes.number,
  greyscale: PropTypes.number,
  spin: PropTypes.number,
  mix: mixPropType,
  tint: PropTypes.number,
  shade: PropTypes.number,
  xor: xorPropType,
  red: PropTypes.number,
  green: PropTypes.number,
  blue: PropTypes.number
});

const MainPropTypes = {
  blur: PropTypes.number,
  brightness: PropTypes.number,
  contain: containPropType,
  cover: coverPropType,
  contrast: PropTypes.number,
  colors: colorsPropType,
  dither565: PropTypes.bool,
  flip: flipPropType,
  fade: PropTypes.number,
  greyscale: PropTypes.bool,
  invert: PropTypes.bool,
  image: PropTypes.any.isRequired,
  normalize: PropTypes.bool,
  opacity: PropTypes.number,
  posterize: PropTypes.number,
  processedImage: PropTypes.func,
  opaque: PropTypes.bool,
  quality: PropTypes.number,
  rotate: rotatePropType,
  resize: resizePropType,
  sepia: PropTypes.bool,
  scale: PropTypes.number,
  scaleToFit: scaleToFitPropType
};

export default MainPropTypes;
