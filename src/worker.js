const processImage = require('./utils/options');

module.exports = function worker(self) {
  self.onmessage = function(e) {
    importScripts('https://cdn.rawgit.com/nitin42/5fef1095f281aa0cdf36ad6e5c460c9a/raw/359af525cb063ac002ebcf39274fb6c7d12e2f3e/jimp.min.js');
    Jimp.read(e.data.image).then(function(image) {
      processImage(image, e.data.props, Jimp).getBase64(Jimp.AUTO, function(err, src) {
        self.postMessage({ src, err });
        self.close();
      });
    });
  };
};
