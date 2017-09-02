# API Reference

## <ProcessImage \/>

`ProcessImage` component takes an image, applies desired filters, resizes the image (if) and returns a base64 image.

```jsx
<ProcessImage 
  image={some_image} 
  resize={{ width: 400, height: 400  }} 
  processedImage={(src, err) => this.setState({ src, err })}
/>
```

`ProcessImage` component does not change the original image. It clones the supplied image and passes it to the filter chain to be processed.

It uses [`react-progressive-image`](https://github.com/FormidableLabs/react-progressive-image) for placeholder image until the image is processed and displayed. 

By default, the image is processed in a web worker instead of main thread for better performance and responsive UI. You can disable this by setting the value of `disableWebWorker` to `true`.

## Props

### image

It takes a url or a path to an image (**required**)

**Type**: string

### resize

It takes width, height and mode for resizing an image

**Type**: object

**Default** - { width: AUTO, height: AUTO, mode: 'bilinear' }

### quality

amount for increasing or decreasing the image quality

**Type**: number

**range**: 1-100

### greyscale

removes the color from the image

**Type**: boolean

**Default** `false`

<p align="center">
  <img src="https://i.gyazo.com/9ba1232088e58a07bc286cac5ac72ebc.png" />
</p>

### normalize

normalizes the channel in an image

**Type**: boolean

**Default**: false

### invert

invert the image color

**Type**: boolean

**Default**: false

<p align="center">
  <img src="https://gyazo.com/12d91fb9c9c610793595254d69c98f1f.png" />
</p>
