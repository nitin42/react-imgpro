import React, { Component } from 'react';
import { render } from 'react-dom';

import ProcessImage from '../build/main.js';

const src = 'http://365.unsplash.com/assets/paul-jarvis-9530891001e7f4ccfcef9f3d7a2afecd.jpg';

class App extends Component {
  state = {
    src: '',
    err: ''
  };

  render() {
    return (
      <div>
        <ProcessImage
          image={src}
          resize={{ width: 400, height: 400 }}
          sepia={true}
          colors={{
            mix: {
              color: 'mistyrose',
              amount: 20
            }
          }}
        />
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));

/**
 * processImage prop (validation)
 * 
 * 
 */