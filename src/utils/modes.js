// Resize modes
const RESIZE_MODES = {
  neighbor: 'RESIZE_NEAREST_NEIGHBOR',
  bilinear: 'RESIZE_BILINEAR',
  bicubic: 'RESIZE_BICUBIC',
  hermite: 'RESIZE_HERMITE',
  bezier: 'RESIZE_BEZIER',
};

// Align modes (contain and cover)
const ALIGN_MODES = {
  horizontal_left: 'HORIZONTAL_ALIGN_LEFT',
  horizontal_center: 'HORIZONTAL_ALIGN_CENTER',
  horizontal_right: 'HORIZONTAL_ALIGN_RIGHT',
  vertical_top: 'VERTICAL_ALIGN_TOP',
  vertical_middle: 'VERTICAL_ALIGN_MIDDLE',
  vertical_bottom: 'VERTICAL_ALIGN_BOTTOM',
};

module.exports = {
  ALIGN_MODES,
  RESIZE_MODES,
};
