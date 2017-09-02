// Depends on the Jimp browser build, accessible via cdn
// <script src="https://cdn.rawgit.com/oliver-moran/jimp/v0.2.27/browser/lib/jimp.min.js"></script>

let ROOT = typeof window.Jimp === 'function' && window.Jimp !== undefined ? window.Jimp : undefined;

export default ROOT;
