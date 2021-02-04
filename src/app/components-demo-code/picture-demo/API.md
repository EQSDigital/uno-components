### \<uno-picture\>
#### UnoPicture

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[width]` | Define the width of the image. | string | '100%' |
| `[height]` | Define the height of the image. | string | '100%' |
| `[defaultImage]` | As we don't have "no" image, an URL path MUST be provided to a default image when user wants to use "no" image. | string | |
| `[image]` | The URL of the image. | string | |
| `[rounded]` | If set to true, the component show a rounded image. | boolean | false |
| `[showEditImage]` | If user has permission to edit image. | boolean | true |
| `[showUploadImage]` | If user has permission to upload new image. | boolean | true |
| `[showRemoveImage]` | If User has permission to remove image. | boolean | true |
| `[showUpIcon]` | Show upload Icon Image, default false. | boolean | true |
| `[UpIconSize]` | Upload Icon Image size. | 'small' \| 'medium' \| 'large' | 'large' |
| `(uploadedImage)` | Emits every time user chooses a new image from its local machine - or cleans the current one - and image is, then, loaded into the cropper. If so, `<uno-cropper-image />` edit Modal is now triggered to open with it on the body. | EventEmitter\<\> | |
| `(deleteImage)` | Emits when user click on remove image. | EventEmitter\<\> | |