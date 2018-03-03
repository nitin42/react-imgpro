import React, { Component } from 'react';
import { render } from 'react-dom';

import ProcessImage from '../build/main.js';

const src = 'https://lh3.ggpht.com/rd52IsX4tX3ManFjv1bTM0eA21CblZ3_1tKul300NHNNqYDoXr-x3qwuiYbF_Ae450RX=h900';

class App extends Component {
  state = {
    src: "",
    err: "",
    sepia: true,
    mixAmount: 10
  };

  render() {
    return (
      <div>
        <ProcessImage
          image={src}
          disableWebWorker={true}
          disableRerender={true}
          resize={{ width: 400, height: 400 }}
          sepia={this.state.sepia}
          colors={{
            mix: {
              color: "mistyrose",
              amount: this.state.mixAmount
            }
          }}
        />
        <button
          onClick={() => {
            this.setState({
              sepia: !this.state.sepia
            });
          }}
        >
          test1
        </button>

        <button
          onClick={() => {
            this.setState({
              mixAmount: (this.state.mixAmount) + 10 
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