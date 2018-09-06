const processImage = require('./utils/options');
const defaultCdn = 'https://unpkg.com/jimp@0.3.9/browser/lib/jimp.min.js';

module.exports = function worker(self) {
  self.onmessage = function(e) {
    // how to ensure Jimp can work?
    try {
      if (!Jimp) {
      }
    } catch (error) {
      const { customCdn } = e.data;
      const cdn = customCdn ? customCdn : defaultCdn;
      importScripts(cdn);
    }

    Jimp.read(e.data.image).then(function(image) {
      processImage(image, e.data.props, Jimp).getBase64(Jimp.AUTO, function(
        err,
        src
      ) {
        self.postMessage({ src, err });
      });
    });
  };
};
