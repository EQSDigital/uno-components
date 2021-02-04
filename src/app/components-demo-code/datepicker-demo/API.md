### \<uno-datepicker\>

#### UnoDatepicker

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[date]` | Shows/sets the currently picked date. | Date | |
| `[showToday?]` | Whether to show (go to) Today button. | boolean | true |
| `[dayNamesShort?]` | Sets the (small) label name for each row's week day. | string[] | ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] |
| `[dayNamesLong?]` | Sets the (long) name for each row's week day - i.e. to be rendered at each weekday's title or popover tooltip. | string[] | ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] |
| `[firstDayOfWeek?]` | Sets the rendering order of the row's week days - the first day to (show) be render is the index, declared here, of the "dayNamesShort" array. If none is passed in, it will be picked the 1st element (index=0) of "dayNamesShort"/"dayNamesLong" array. | number | 0 |
| `[monthNames?]` | Sets the month label name for Headers month selector. | string[] | ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'] |
| `[numYearsBefore?]` | Sets how many years before the today's current are listed in the Dropdown. | number | 100 |
| `[numYearsAfter?]` | Sets how many years after the today's current are listed in the Dropdown. | number | 10 |
| `(dateChange)` |  Emits the selected date, in a JS Date format. | EventEmitter\<number\> | |