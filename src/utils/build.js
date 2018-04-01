import root from 'window-or-global';

let ROOT =
  root.Jimp !== undefined && typeof root.Jimp === 'function'
    ? root.Jimp
    : undefined;

export default ROOT;
