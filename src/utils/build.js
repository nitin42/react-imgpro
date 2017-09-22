// Depends on the Jimp browser build, accessible via cdn
// <script src="https://cdn.rawgit.com/oliver-moran/jimp/v0.2.27/browser/lib/jimp.min.js"></script>
import root from 'window-or-global';

let ROOT = typeof root.Jimp === 'function' && root.Jimp !== undefined ? root.Jimp : undefined;

export default ROOT;
