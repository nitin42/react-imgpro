import React, { Component } from 'react';
import { render } from 'react-dom';

import ProcessImage from '../src';

const src = 'http://orscxqn8h.bkt.clouddn.com/18-3-3/943334.jpg';

class App extends Component {
  state = {
    src: '',
    err: '',
    sepia: true,
    mixAmount: 10,
    isProcessing: false
  };

  render() {
    return (
      <div>
        <ProcessImage
          image={src}
          // disableWebWorker={true}
          resize={{ width: 400, height: 400 }}
          sepia={this.state.sepia}
          onProcessFinish={() => {
            this.setState({
              isProcessing: false
            });
          }}
          colors={{
            mix: {
              color: 'mistyrose',
              amount: this.state.mixAmount
            }
          }}
        />
        <button
          disabled={this.state.isProcessing}
          onClick={() => {
            this.setState({
              sepia: !this.state.sepia,
              isProcessing: true
            });
          }}
        >
          test1
        </button>

        <button
          disabled={this.state.isProcessing}
          onClick={() => {
            this.setState({
              mixAmount: this.state.mixAmount + 10,
              isProcessing: true
            });
          }}
        >
          test2
        </button>
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
