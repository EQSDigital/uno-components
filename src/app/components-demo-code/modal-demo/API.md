### \<uno-modal\>

#### UnoModal

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[headerStr]` | `<uno-modal />`'s heading text. | string | |
| `[subHeaderStr]` | `<uno-modal />`'s sub-heading text. | string | |
| `[headerAlign]` | The position of the heading and sub heading. | 'left' \| 'center' \| 'right' | 'left' |
| `[size]` | Whether `<uno-modal />` has large size or, if no @Input is passed in, default (small) size. | 'large' | |
| `[separateButtons]` | Whether buttons inside footer spread to both left and right (default). | boolean | true |
| `[modalIsDeaf]` | Wether Modal, once opened, listens for `esc` or `click-outside` events to close (that's default behavior) | boolean | false |
| `[open]` | Force `<uno-modal />` to open/close - the modal exists from loading; but can, here, be made visible or not. | boolean | |
| `[templateType]` | Defines the choosen template, if any, to draw the `<uno-modal />`'s Body. | 'successModal' \| 'warningModal' \| 'confirmDelModal' \| 'confirmActionModal' \| 'assets3DModal' \| 'docsUploadModal' | |
| `[templateCustomMsg]` | Defines a custom message (can be an HTML string) to appear as a second "line" @ any of the 'templateType' switched templates - thus only used at 'successModal', 'warningModal', 'confirmDelModal' or 'confirmActionModal' templates. | string \| HTML | |
| `[templateIconPath]` | Provides a path for an upper `templateType` template's image/icon/svg. A default one is provided and should exist (as a default template's image/icon/svg) @ Nano app. | string | |
| `[scenes3D]` | Exclusively for 'assets3DModal' Template (should, at least, have property 'name'), defines the Data (the scenes Array) to become a listing clickable options of each of the scenes 3D visualization link. | any[] | |
| `[docTypeSelector]` | Exclusively for 'docsUploadModal' Angular Reactive Form Template (should, at least, have property 'Name'), defines the Data (the Type Array) to become a listing selectable options of each of the document (to upload) Type. It's a mandatory Input form field, every time 'templateType'=`docsUploadModal` is called. | any[] | |
| `[docStatusSelector]` | Exclusively for 'docsUploadModal' Angular Reactive Form Template  (should, at least, have property 'Name'), defines the Data (the Status Array) to become a listing selectable options of each of the document (to upload) Status. It's a mandatory Input form field, every time 'templateType'=`docsUploadModal` is called. | any[] | |
| `[resetForm]` | Exclusively for 'docsUploadModal' Angular Reactive Form Template: resets the template's 'uploadForm' form - values (initial state) and `Validators`. | boolean | |
| `[submitForm]` | Exclusively for 'docsUploadModal' Angular Reactive Form Template: sends a comand to the template's 'uploadForm' form to be submited - component will respond back @Output "formSubmitionData" with the current "uploadForm.value" Object values. | boolean | |
| `[editData]` | Document upload modal data to allow edition. | | |
| `[showDate]` | Determines if the data field is shown. | boolean | true |
| `[showTag]` | Determines if the tag field is shown. | boolean | true |
| `[showComment]` | Determines if the comment field is shown. | boolean | true |
| `[showType]` | Determines if the document type field is shown. | boolean | true |
| `[showName]` | Determines if the name field is shown. | boolean | true |
| `[fileSize]` | Determines the maximum size of the file in bytes. (1.5mb === 1500000) | number | |
| `[acceptedTypes]` | string` Determines what types of files are accepted (ex: .pdf, .docx, etc) | | |
| `[sscStatusLabel]` | Site Safety Coordinator Label. | string | 'sscStatusLabel' |
| `(openChange)` | Any/all TEMPLATES: emitted when `<uno-modal />`'s visibility is going to change to false (about to be closeed). | EventEmitter\<boolean\> | |
| `(clickedButton)` | For ALL 'templateType' switched TEMPLATES ('successModal', 'warningModal', 'confirmDelModal', 'confirmActionModal'), where no header or footer exists - the whole `<uno-modal />` window is made at a Body Template. Generally speaking emits an event containing the label of the clicked ('Cancel'/'OK') button, so we can correspond unequivocally, at instalation code, the HTML button event with the TS action/function. | EventEmitter\<string\> | |
| `(selected3DScene)` | For 'assets3DModal' TEMPLATE: emitted when user chooses one of a 3D scene set, to visualize - sceneIdx is passed on the emitter. | EventEmitter\<number\> | |
| `(formValidation)` | For 'docsUploadModal' Angular Reactive Form TEMPLATE: emitted on any template's 'uploadForm' form `changes/validation`, stating if the form is 'Valid'/'Invalid', so we can take action (i.e. enable/disable buttons) @ component's installation. | EventEmitter\<boolean\> | |
| `(formSubmitionData)` | For 'docsUploadModal' Angular Reactive Form TEMPLATE: once an installation request of template's 'uploadForm' `form submition` is triggered (@Input "submitForm"=true), this `<uno-modal />` component responds back to the instalation code, passing in the current "uploadForm.value" Object values. | EventEmitter\<any\> | |


### Content possibilities

* `<ng-template unoModalHeader />` Inject the `unoModalHeader` Directive to render the `<uno-modal />`'s `Header`, with code written @ installation.
* `<ng-template unoModalFooter />` Inject the `unoModalFooter` Directive to render the `<uno-modal />`'s `Footer`, with code written @ installation.