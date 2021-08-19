### \<uno-color-picklist\>
#### UnoColorPicklist

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[data]` |  The array with all colors to show on dropdown. | [{color: "#000"}] | |
| `[unoPick]` | The current selected color. | {color: "#000"} | |
| `[popOverPosition]` | The position of the popover to open. | string | |
| `[nubbinPosition]` | The position of the nubbin. | string | |
| `[closeClickOutside]` | Close the popover when click outside element. | boolean | false |
| `(selectedElem)` | Emits the color selected. | EventEmitter\<any\> | |
