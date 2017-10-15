import renderer from 'react-test-renderer';
import Jimp from 'jimp';
import processImage from '../src/utils/options';

describe('image options', () => {
	const image = 'http://365.unsplash.com/assets/paul-jarvis-9530891001e7f4ccfcef9f3d7a2afecd.jpg';
	let output = null;

	test('sanity check', () => {
		Jimp.read(image).then(image => {
      const output = processImage(image, { resize: { height: 300 } }, Jimp) 
			expect(output.bitmap.height).toEqual(300);
		});
  });
});
