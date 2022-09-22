### \<uno-drag-drop-file\>
#### UnoDragDropFile

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[maxFileSize]` | Define the maximun size of the file | number | |
| `[multipleFiles]` | Set the drag and drop to accept multiple files | boolean | false |
| `[file]` | The file to show on the drag and drop area | File | |
| `[disable]` | Disable the delete icon | boolean | false |
| `[disableDownload]` | Disable the download icon | boolean | false |
| `(filesDropped)` | Emitter with files dropped  | EventEmitter | |
| `(deleteFile)` | Emitter to delete file | EventEmitter | |
| `(downloadFile)` | Emitter to download file | EventEmitter | |

### \<element unoDragDropFile\>

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[multipleFiles]` | Set the drag and drop to accept multiple files | boolean | false |
| `[disable]` | Disable the delete icon | boolean | false |
| `(filesDropped)` | Emitter with files dropped | EventEmitter | |
