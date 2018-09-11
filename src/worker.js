import processImage from './utils/options';
const defaultCdn = 'https://unpkg.com/jimp@0.3.9/browser/lib/jimp.min.js';

export function process(data) {
  // how to ensure Jimp can work?
  return new Promise(resolve => {
    try {
      if (!Jimp) {
      }
    } catch (error) {
      const { customCdn } = data;
      const cdn = customCdn ? customCdn : defaultCdn;
      importScripts(cdn);
    }

    Jimp.read(data.image).then(function(image) {
      processImage(image, data.props, Jimp).getBase64(Jimp.AUTO, function(
        err,
        src
      ) {
        resolve({ src, err });
      });
    });
  });
}
