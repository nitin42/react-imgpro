/**
 * This function returns the height of the image based on the props,
 * style attributes or the original dimension values
 * @param { object } props Component props
 * @param { number } original Original dimensions of the image
 * @param { string } attribute Height or Width
 */
let getSize = (props, original, attr) => {
  if (props.resize !== undefined) return props.resize[attr];
  if (props.contain !== undefined) return props.contain[attr];
  if (props.cover !== undefined) return props.cover[attr];
  if (props.scaleToFit !== undefined) return props.scaleToFit[attr];
  if (props.style !== undefined) return props.style[attr];
  if (props[attr] !== undefined) return parseInt(props[attr], 10);

  return original;
};

export default getSize;
