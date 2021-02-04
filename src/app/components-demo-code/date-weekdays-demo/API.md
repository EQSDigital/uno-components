### \<tr uno-date-weekdays\>

#### UnoDateWeekdays

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[dayNamesShort]` | Sets the (small) label name for each row's week day. | string[] | ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] |
| `[dayNamesLong]` | Sets the (long) name for each row's week day - i.e. to be rendered at each weekday's title or popover tooltip. | string[] | ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] |
| `[firstDayOfWeek]` | Sets the rendering order of the row's week days - the first day to (show) be render is the index, declared here, of the "dayNamesShort" array. If none is passed in, it will be picked the 1st element (index=0) of "dayNamesShort"/"dayNamesLong" array. | number | 0 |

> NOTE 1: `uno-date-weekdays` it's NOT a <em>traditional</em> Angular component but an Angular <strong>Directive</strong>, to use @ any <`table`> HTML's <`tr` /> tag - you then can define a complete Table's row with `uno-date-weekdays`, as having the complete set/array of week days (one for each row's column).