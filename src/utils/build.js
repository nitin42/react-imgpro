import root from 'window-or-global';

let ROOT = typeof root.Jimp === 'function' && root.Jimp !== undefined ? root.Jimp : undefined;

export default ROOT;
