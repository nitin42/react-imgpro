# API Reference

## Component

**ProcessImage**

It takes an image, applies desired filters, resizes the image (if) and returns a base64 image.

```jsx
<ProcessImage 
  image={some_image_url_or_path} 
  resize={{ width: 400, height: 400  }} 
  processedImage={(src, err) => this.setState({ src, err })}
/>
```

It does not change the original image. It clones the supplied image and passes it to the filter chain to be processed.

It uses [`react-progressive-image`](https://github.com/FormidableLabs/react-progressive-image) for placeholder image until the image is processed and displayed. 

By default, the image is processed in a web worker instead of main thread for better performance and responsive UI. You can disable this by setting the value of `disableWebWorker` to `true`.

## Props


### resize

It takes image width, height and a resize mode.

**Type** - `object`

**Default** - `{ width: AUTO, height: AUTO, mode: 'bilinear' }`

**resize modes**

You can pass these values to `mode`
* [neighbor](https://en.wikipedia.org/wiki/Image_scaling)
* [bilinear](https://en.wikipedia.org/wiki/Image_scaling)
* [bicubic](https://en.wikipedia.org/wiki/Image_scaling)
* [hermite](https://en.wikipedia.org/wiki/Hermite_interpolation)
* bezier

**Example** - 

```jsx
<ProcessImage image={image} resize={{ width: 500, height: 500, mode: 'bicubic' }} />
```

### quality

It takes a number between `1` - `100` for the image quality.

**Type** - `number`

**Default** - `AUTO`

**Example** -

```jsx
<ProcessImage image={image} quality={95} />
```

### greyscale

Remove colors from the image

**Type** - `boolean`

**Default** - `false`

**Example** -

```jsx
<ProcessImage image={image} greyscale={true} />
```

<img src="https://i.gyazo.com/9ba1232088e58a07bc286cac5ac72ebc.png">

### normalize

normalize the channels in an image (contrast stretching). For example the images with poor contrast due to glare.

**Type** - `boolean`

**Default** - `false`

**Example** -

```jsx
<ProcessImage image={image} normalize={true} />
```

<img src="https://i.gyazo.com/0497dd3d6f9729fbc595ce032bf61e22.png">

### invert

invert the image colors

**Type** - `boolean`

**Default** - `false`

**Example** - 

```jsx
<ProcessImage image={image} invert={true} />
```

<img src="https://i.gyazo.com/310bef2955e9be729e0d92e411aa44bd.png">

### opaque

This sets the alpha channel to **opaque** for every pixel.

**Type** - `boolean`

**Default** - `false`

**Example** - 

```jsx
<ProcessImage image={image} opaque={true} />
```

### sepia

creates a reddish brown tone in an image.

**Type** - `boolean`

**Default** - `false`

**Example** - 

```jsx
<ProcessImage image={image} sepia={true} />
```

<img src="https://gyazo.com/3eb78b8069bbc1223475eec693795da2.png">

### dither565 (similar to ninepatches class in Android)

mix pixels of two colors

**Type** - `boolean`

**Default** - `false`

**Example** - 

```jsx
<ProcessImage image={image} dither565={true} />
```

<img src="https://gyazo.com/9219fef633e9ef4f67851ef6405f494b.png">

### scale

scale an image by a factor

**Type** - `boolean`

**Default** - `AUTO`

**Example** - 

```jsx
<ProcessImage image={image} scale={4} />
```

### scaleToFitImage

scale an image to the largest size that fits inside the given width and height

**Type** - `object`

**Default** - `{}`

**Example** - 

```jsx
<ProcessImage image={image} scaleToFit={{ width: 500, height: 500 }} />
```

### flip

flip the direction of an image

**Type** - `object`

**Default** - { horizontal: `false`, vertical: `false` }

**Example** - 

```jsx
<ProcessImage image={image} flip={{ horizontal: true }}
```

### rotate

rotate the image

**Type** - `object`

**Default** - `{}`

**Example** - 

```jsx
<ProcessImage image={image} rotate={{ degree: 75, mode: 'bilinear' }}
```

> Optionally, a resize mode can be passed. If `false` is passed as the second parameter, the image width and height will not be resized.

### brightness

change the brightness level of an image. It takes value from `-1` to `1`.

**Type** - `number`

**Example** - 

```jsx
<ProcessImage image={image} brightness={0.5} />
```

### contrast

change the contrast level of an image. It also takes value from `-1` to `1`.

**Type** - `number`

**Example** - 

```jsx
<ProcessImage image={image} contrast={0.3} />
```

### fade

fades an image by factor `0 - 1`.

**Type** - `number`

**Example** - 

```jsx
<ProcessImage image={image} fade={0.8} />
```

#### opacity

multiply the alpha channel by each pixel by the factor f, 0 - 1. Alternative to fade.

**Type** - `number`

**Example** - 

```jsx
<ProcessImage image={image} opacity={0.8} />
```

### blur

fast blur the image by r pixels. It takes a value from `1` - `100`.

**Type** - `number`

**Example** - 

```jsx
<ProcessImage image={image} blur={20} />
```

### posterize

apply a posterization effect with n level. It takes a value from `1` - `100`.

**Type** - `number`

**Example** - 

```jsx
<ProcessImage image={image} posterize={50} />
```

<img src="https://gyazo.com/be0a62cbcc7dfa9c329c59aa5ecb1d29.png">

### cover

scale the image to the given width and height, some parts of the image may be clipped

**Type** - `object`

**Default** - `{}`

**modes**

* `horizontal_left`
* `horizontal_center`
* `horizontal_right`
* `vertical_top`
* `vertical_bottom`
* `vertical_middle`

**Example** - 

```jsx
<ProcessImage image={image} cover={{ width: 400, height: 400, mode: 'horizontal_center' }} />
```

### contain

scale the image to the given width and height, some parts of the image may be letter boxed

**Type** - `object`

**Default** - `{}`

**modes**

* `horizontal_left`
* `horizontal_center`
* `horizontal_right`
* `vertical_top`
* `vertical_bottom`
* `vertical_middle`

**Example** - 

```jsx
<ProcessImage image={image} contain={{ width: 400, height: 400, mode: 'horizontal_center' }} />
```

### colors

color manipulation

**Type** - `object`

**Default** - `{}`

**color properties**

```
colors = {
  lighten: number
  brighten: number
  darken: number,
  desaturate: number,
  saturate: number,
  greyscale: number,
  spin: number,
  mix: {
    color: string,
    amount: number
  },
  tint: number,
  xor: number,
  shade: number,
  red: number,
  green: number,
  blue: number
}
```

> Details given below are taken from [Jimp]() docs.
* `lighten` - Lighten the color by a given amount, from 0 to 100. Providing 100 will always return white.
* `brighten` - Brighten the color by a given amount, from 0 to 100.
* `darken` - Darken the color by a given amount, from 0 to 100. Providing 100 will always return black.
* `desaturate` - Desaturate the color by a given amount, from 0 to 100. Providing 100 will is the same as calling greyscale.
* `saturate` - Saturate the color by a given amount, from 0 to 100.
* `greyscale` - Completely desaturates a color into greyscale.
* `spin` - spin the color amount from -360 t0 360.
* `mix` - Mixes colors by their RGB component values. Amount is opacity of overlaying color.
* `tint` - Same as applying mix with white color.
* `shade` - Same as applying mix with black color.
* `xor` - Treats the two colors as bitfields and applies an XOR operation to the red, green, and blue components.
* `red` - Modify red component by a given amount.
* `green` - Modify green component by a given amount.
* `blue` - Modify blue component by a given amount.

### storage

localStorage for storing the edited image.

**Type** - `boolean`

**Default** - `true`

**Example** - 

```jsx
<ProcessImage image={image} storage={false} />
```

### disableWebWorker

disable the web worker and process the image in the main thread (not recommended).

**Type** - `boolean`

**Default** - `false`

**Example** - 

```jsx
<ProcessImage image={image} disableWebWorker={true} />
```

If you disable the web worker, you will need to add [this](https://github.com/nitin42/react-imgpro/blob/master/src/jimp.min.js) file in your `index.html` in order to access `Jimp` instance. 



