const processImage = require('./utils/options');

// Code below is executed in web worker (above code is not intensive and is processed in main thread and not in web worker)
module.exports = function worker(self) {
  self.onmessage = function(e) {
    importScripts('https://cdn.rawgit.com/oliver-moran/jimp/v0.2.27/browser/lib/jimp.min.js');
    Jimp.read(e.data.image).then(function(image) {
      processImage(image, e.data.props, Jimp).getBase64(Jimp.AUTO, function(err, src) {
        self.postMessage({ src, err });
        self.close();
      });
    });
  };
};
