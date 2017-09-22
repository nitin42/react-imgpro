import React from 'react';
import renderer from 'react-test-renderer';
import getSize from '../src/utils/getDimensions';

describe('getDimension', () => {
  const inp = { resize: { height: 300, width: 400 }};
  const def = 300;

  test('should return the image height when attribute passed is \'height\' ', () => {  
    const height = getSize(inp, def, 'height');
  
    expect(height).toMatchSnapshot();
  })

  test('should return the image width when attribute passed is \'width\' ', () => {  
    const width = getSize(inp, def, 'width');
  
    expect(width).toMatchSnapshot();
  });

  test('should fallback to default', () => {  
    const height = getSize({}, def, 'height');
  
    expect(height).toMatchSnapshot();
  });
});
