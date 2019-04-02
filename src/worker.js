import processImage from './utils/options';
const defaultCdn = 'https://unpkg.com/jimp@0.6.0/browser/lib/jimp.min.js';

export function process(data) {
  // how to ensure Jimp can work?
  return new Promise((resolve, reject) => {
    try {
      if (!Jimp) {
      }
    } catch (error) {
      const { customCdn } = data;
      const cdn = customCdn ? customCdn : defaultCdn;
      importScripts(cdn);
    }

    Jimp.read(data.image)
      .then(image => {
        processImage(image, data.props, Jimp).getBase64(
          Jimp.AUTO,
          (err, src) => {
            resolve({ src, err });
          }
        );
      })
      .catch(err => {
        reject(err);
      });
  });
}
