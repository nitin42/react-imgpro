# API Reference

## <ProcessImage /> component

`<ProcessImage />` component takes an image, applies desired filters, resizes the image (if) and returns a base64 image.

```jsx
<ProcessImage 
  image={some_image} 
  resize={{ width: 400, height: 400  }} 
  processedImage={(src, err) => this.setState({ src, err })}
/>
```

`ProcessImage` component does not change the original image. It clones the supplied image first then it passes it to the filter chain to be processed.

It also uses [`react-progressive-image`]() for placeholder image until the image is processed and displayed. 

`ProcessImage` has different behaviour in some conditions. By default, it stores the image in localStorage for comparing the consecutive images. You can disable this by setting the value of  `noStorage` prop to `false`.

By default, the image is processed in a web worker instead of main thread for better performance and responsive UI. You can disable this by setting the value of `disableWebWorker` to `true`.

## Props

### image

***url or a path to an image (required)**

**Type** - string

### resize   

