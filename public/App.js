import React, { Component } from 'react';
import { render } from 'react-dom';

import ProcessImage from '../build/main.js';

const src = 'https://lh3.ggpht.com/rd52IsX4tX3ManFjv1bTM0eA21CblZ3_1tKul300NHNNqYDoXr-x3qwuiYbF_Ae450RX=h900';

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
          disableWebWorker={true}
          resize={{ height: 500, width: 500 }}
          colors={{
            mix: {
              color: 'purple',
              amount: 10
            },
            saturate: 10,
            lighten: 20
          }}
          processedImage={(src, err) => this.setState({ src, err })}
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