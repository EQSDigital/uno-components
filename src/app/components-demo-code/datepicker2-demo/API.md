### \<uno-datepicker2\>

#### UnoDatePicker2

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[chooseLabel]` | Variable of the placeholder datepicker. | string | 'Choose a date' |
| `[disable]` | Variable to disable the datepicker. | boolean | false |
| `[disableCalendar]` | Variable to disable the datepicker calendar. | boolean | false
| `[date]` | Variable with the current date to display. | Date | |
| `[required]` | Variable to add the required validation to the datepicker. | boolean | false |
| `[hideError]` | Variable to hide the error message. | boolean | false |
| `[min]` | Variable for the min year on the datepicker. | number | |
| `[max]` | Variable for the max year on the datepicker. | number | |
| `(dateChange)` | Emits the new date selected. | EventEmitter\<Date \| null \| 'invalid'\> | |