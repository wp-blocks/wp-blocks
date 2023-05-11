# @wp-blocks/image
#### Node.js Image Compression and Optimization Script

This Node.js script helps to compress and optimize images in a given directory. The script supports different image formats and uses various compression algorithms to reduce the file size of images.

## Requirements

- Node.js version 14 or above
- npm or yarn package manager

## Installation

1. Clone the repository or download the source code as a ZIP file.
2. Open a terminal and navigate to the project directory.
3. Run `npm install` or `yarn install` command to install the required dependencies.

## Usage

To use the script, run the following command:

```
node ./bin.js
```

The script will prompt you to enter the source and destination directory paths. After entering the directories, the script will show the list of image formats available in the source directory. You can choose the compression options for each format.

### Supported Image Formats

The script supports the following image formats:

- AVIF (.avif)
- WEBP (.webp)
- JPEG (.jpg, .jpeg)
- PNG (.png)
- GIF (.gif)
- SVG (.svg)
- TIFF (.tiff)

### Available Compression Options

- AVIF: `libvips`
- WEBP: `libwebp`
- JPEG: `libjpeg`
- MOZJPEG: `mozjpeg`
- PNG: `pngquant`
- SVG: `svgo`

### Configuration

The following configuration options are available in the script:

- `compressors`: An array of available compression algorithms. By default, it includes `avif`, `webp`, and `mozjpeg`.
- `svgOptions`: An array of available SVGO plugins. By default, it includes the most commonly used plugins to optimize SVG files.

## License

This script is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more information.
