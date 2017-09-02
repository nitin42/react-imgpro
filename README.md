# 📷 react-imgpro
> Image Processing Component for React

<p align="center">
  <img src="./react-impro.png" height="200" width="200">
</p>

## Introduction

`react-imgpro` is a image processing component for React. This component process an image with supplied filters as props and returns a [base64](https://en.wikipedia.org/wiki/Base64) image. 

Basic example -

```jsx
<Process
  image=''
  colors={{
    mix: {
      color: 'mistyrose',
      amount: 10
    }
  }}
  resize={{ width: 500, height: 500, mode: 'bilinear' }}
/>
```

<p align="center">
<img src="./introduction.jpg" height="400" width="800">
</p>

