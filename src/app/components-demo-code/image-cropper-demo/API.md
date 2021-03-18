### \<uno-image-cropper\>
#### UnoImageCropper

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[imageChangedEvent]` | The change event from your HTML5 file input (set to `null` to reset the cropper). | FileEvent | |
| `[imageFileChanged?]` | The file you want to change (set to `null` to reset the cropper). | Blob(File) | |
| `[imageBase64?]` | If you don't want to use a file input, you can set a `base64` image directly and it will be loaded into the cropper. | string | |
| `[format?]` | Output desired for the image's format (png, jpeg, webp, bmp, ico). As not all browsers support all types, `png`, the default value, is always supported. | 'png' \| 'jpeg' \| 'bmp' \| 'webp' \| 'ico' | 'png' |
| `[outputType]` | Converting the image to a Blob can be quite a heavy operation... With this option, you could choose to only get the base64 which will improve the speed of cropping significantly. | 'base64' \| 'file' \| 'both' | both |
| `[roundCropper?]` | Set this to true for a round cropper. Resulting image will still be square, use `border-radius: 100%` on resulting image to also show it as round, cooping with the cropper operations being done. | boolean | false |
| `[aspectRatio?]` | The desired width / height ratio (e.g. 1 / 1 for a square, 4 / 3, 16 / 9 ...). Please note the spaces between figures and slash operator. | number | 1 / 1 |
| `[maintainAspectRatio?]` | Keeps width and height of cropped operations (and final result) according to the defined `aspectRatio`. | boolean | true |
| `[resizeToWidth?]` | Cropped image will be resized to this width (in px). Default number `0` means disabled parameter - no resizing; comes as it is (which can be quite a big, unknown, space to occupy @ the installation App page). | number | 0 |
| `[cropperMinWidth?]` | The cropper operations cannot made `imageCropped` smaller than this number of pixels (relative to original image's size, in px). | number | 0 |
| `[onlyScaleDown?]` | When the `resizeToWidth` is set, enabling this option will make sure smaller images are not scaled up. | boolean | false |
| `[cropper?]` | To be able to overwrite the cropper coordinates, you can use this input. Create a new object of type `CropperPosition` (a Type imported from component's UI lib) and assign it to this input. Make sure to create a new object each time you wish to overwrite the cropper's position and wait for the `cropperReady` Output() event to have been emitted. |  CropperPosition = { x1: -100, y1: -100, x2: 10000, y2: 10000 } | |
| `[imageQuality?]` | This only applies when using `jpeg` or `webp` as output format. Entering a number between 0 and 100 will determine the quality of the output image. | number | 92 |
| `[autoCrop]` | When set to true, the cropper will emit an image each time the position or size of the cropper is changed. When set to false, you can call the crop method yourself (use @ViewChild to get access to the croppers methods). | bollean | true |
| `[alignImage]` | Use this to align the image in the cropper either to the left or center. | 'left' \| 'center' | 'center'
| `(imageLoaded)` | Triggered when the image was loaded into the cropper. | EventEmitter\<\> | |
| `(loadImageFailed)` | Triggered when a wrong file type was selected (only png, gif and jpg are allowed). | EventEmitter\<\> | |
| `(startCropImage)` | Triggered once cropper is ready to (re)start - either at loading picture or any other time user uses the cropper. | EventEmitter\<\> | |
| `(imageCropped)` | Emits an ImageCroppedEvent event (a Type imported from component's UI lib, with cropped image properties) each time the image is cropped. | EventEmitter\<ImageCroppedEvent\> | |
| `(cropperReady)` | Triggered when the component finishes 1st cropping (or any other later) of the loadded image and is ready to be user used. | EventEmitter\<\> | |
