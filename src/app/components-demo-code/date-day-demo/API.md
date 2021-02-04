### \<td uno-date-day\>

#### UnoDateDay

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[day]` | The day's calendar number - also accepts any string (no arithmetic is done upon day figure). | number \| string | |
| `[dayDisabled]` | Upon certain condition resulted to "true", THIS `uno-date-day` cell will be disabled (for mouse events and proper styling, classed as '.slds-disabled-text') | boolean | |
| `[daySelected]` | Upon certain condition resulted to "true", THIS `uno-date-day` cell will be rendered as selected (proper styling, classed as '.slds-is-selected') | boolean | |

> NOTE 1: `uno-date-day` it's NOT a \<em\>traditional\</em\> Angular component but an Angular \<strong\>Directive\</strong\>, to use @ any \<`table`\> HTML's \<`td` /\> tag - each Table's cell is a different `uno-date-day`

