### \<uno-switch\>
#### UnoSwitch

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[size]` | The possible sizes of `uno-switch`. | 'small' \| 'medium' \| 'large' | 'small' |
| `[minWidth]` | Sets the CSS property `min-width` of boolean text span container - classed as `.uno-switch-boolean `, prevents from "jumping" on clicking, when instalation text of "enabledText"/ "disabledText" are different or far bigger/smaller. | string | |
| `[enabledText]` |Text to appear in front of the `uno-switch`, when it's state is set to `true`. | string | |
| `[disabledText]` | Text to appear in front of the `uno-switch`, when it's state is set to `false`. | string | |
| `[checked]` | Set `uno-switch` to `true`/`false`, at first render. | boolean | |
| `[disable]` | Set `uno-switch` to disabled - you can still set it to `true`/`false`, at first render. | boolean | |
| `(changed)` | Emits when user clicks. | EventEmitter\<boolean\> | |