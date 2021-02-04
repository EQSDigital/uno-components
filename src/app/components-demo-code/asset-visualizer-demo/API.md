### \<uno-asset-visualizer\>
#### UnoAssetVisualizer

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[defaultAssetImgURL]` | As we don't have "no" image, an URL path MUST be provided to a default asset image when user wants to use "no" image for the Asset. | string | |
| `[imgURL]` | If an image is supposed to existe for the Asset, this is the Input to pass it in (a base64 "string", since img is found saved at DB). | string | |
| `[editable]` | If set to true, a suplementar icon bar opens on the bottom of the Asset img with icons allowing some sort of editing (upload a different image, delete current uploaded/loaded, etc.). | boolean | |
| `[hasMonitor]` | Sets an icon, at the bottom bar, to enable the user to navigate to some monitoring page/application - specifications must be done at the instalation side. | boolean | |
| `[scenes3D]` | Sets an icon (or more), at the bottom bar, to enable the user to navigate to some 3D visualizar page/application - specifications must be done at the instalation side.  | any[] | |
| `(imageLoaded)` | Emits every time user chooses a new image from its local machine - or cleans the current one - and image is, then, loaded into the cropper. If so, `<uno-cropper-image />` edit Modal is now triggered to open with it on the body. | EventEmitter\<\> | |
| `(loadImageFailed)` | Emits when a wrong file type was selected (only png, gif and jpg are allowed). The `<uno-cropper-image />` edit Modal should not open, on this case. | EventEmitter\<\> | |
| `(imageUploaded)` | When user presses "Save", at `<uno-cropper-image />` edit Modal, an emitter is trigered with the cropped image (File Blob) event, so procedures can be triggered at the installation side. The cropped image is, then, showed at this `<uno-asset-visualizer />` component. | EventEmitter\<File extends Blob\> | |
| `(startCropImage)` | Triggered once cropper is ready to (re)start - either at loading picture or any other time user uses the cropper. | EventEmitter\<\> | |
| `(imageIsCropped)` | Emits an ImageCroppedEvent event (a Type imported from component's UI lib, with cropped image properties) each time the image is cropped. | EventEmitter\<ImageCroppedEvent\> | |
| `(cropperReady)` | Triggered when the component finishes 1st cropping (or any other later) of the loadded image and is ready to be user used. | EventEmitter\<\> | |
| `(cancelImgCropperModal)` | User has pressed the Cancel button @ `<uno-cropper-image />` edit Modal. | EventEmitter\<\> | |
| `(saveImgCropperModal)` | It triggers the upper `imageUploaded()` @Output() Directive. At the same time, emits the cropped image (to be eventually uploaded @ instalation's API) this time on a base64 string. | EventEmitter\<string\> | |
| `(sendAssetInfo)` | Uppon user click on some icon at suplementar icon bar opened at the bottom of the Asset img, an event is emitted to the instalation, so some specific procedures can be taking care of. | EventEmitter\<\> | |
| `(goToMonitorLink)` | Uppon user click on some icon at suplementar icon bar opened at the bottom of the Asset img, an event is emitted to the instalation, so some specific procedures can be taking care of. | EventEmitter\<\> | |



