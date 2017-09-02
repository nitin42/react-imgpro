# 📷 react-imgpro
> Image Processing Component for React

<p align="center">
  <img src="./react-impro.png" height="200" width="200">
</p>

## Introduction

`react-imgpro` is a image processing component for React. This component process an image with supplied filters as props and returns a [base64](https://en.wikipedia.org/wiki/Base64) image. 

**Basic example -**

```jsx
class App extends React.Component {
  state = { src: '', err: null }
  
  render() {
    return (
      <Process
        image='http://365.unsplash.com/assets/paul-jarvis-9530891001e7f4ccfcef9f3d7a2afecd.jpg'
        colors={{
          mix: {
            color: 'mistyrose',
            amount: 10
          }
        }}
        resize={{ width: 500, height: 500, mode: 'bilinear' }}
        processedImage={(src, err) => this.setState({ src, err, })}
      />     
    )
  }
}
```

<p align="center">
<img src="./introduction.jpg" height="400" width="800">
</p>

## Why ?

I was working on a project last month which involved a lot of image processing and I'd to use [OpenGL](https://www.opengl.org/). But before using OpenGL directly, I'd to learn different concepts in gl and then try to implement them in React with third party libs. The difficult part was not learning but it was the verbosity, boilerplate code and redundancy introduced by the libs in the codebase. It was getting difficult to organise all the things 😞

So I wanted a layer of abstraction which would make it easy to manipulate the colors of the image, applying filters and gl shaders efficiently with ease. And React's component based model was perfect for hiding all the implementation details in a component 😄 

## Install

```
npm install react-imgpro
```

This also depends on `react` so make sure you've installed it.

## Usage

```jsx
import React from 'react';
import ProcessImage from 'react-imgpro';

class App extends React.Component {
  state = {
    src: '',
    err: null
  }
  
  render() {
    return (
      <ProcessImage
        image='http://365.unsplash.com/assets/paul-jarvis-9530891001e7f4ccfcef9f3d7a2afecd.jpg'
        resize={{ width: 500, height: 500 }}
        colors={{
          mix: {
            color: 'mistyrose',
            amount: 20
          }
        }}
        processedImage={(src, err) => this.setState({ src, err})}
      />
    )
  }
}

```

## Documentation

See the detailed documentation [here]().

## Contributing

[Contributing guide]()

## License

MIT
