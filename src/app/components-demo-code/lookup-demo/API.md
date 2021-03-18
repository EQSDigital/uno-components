### \<uno-lookup\>

#### UnoLookup

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[pick]` | The selected item (Obj, string, number, ...) by the user. | any | |
| `[value]` | Input filter value. ONLY chnges on this value, will trigger `<uno-lookup />` Dropdown refreshment. | string |
| `[lookup]` | MUST be a function! It's the callback to invoke to search for suggestions - `<uno-lookup />` Dropdown will EXCLUSIVELY refresh on `value` (search text Input) CHANGES. | Function (value: string): Observable\<any[]\> \| any[] ||
| `[field]` | On the received Data, the field that will suport label writing/changes, upon new pick item. | string |
| `[isDisabled]` | Whether `<uno-lookup />` Input box search term is disabled. | boolean |
| `[debounce]` | Delay so that the actual value update only takes place when a timer expires. A value of 0 triggers an immediate update. | number | 200
| `[searchIcon]` | Wether Input box has a search icon or not. | boolean | true |
| `[noResultsText]` | You can personalize the mo items found pre-defined message. | string | 'Sorry! No results found...'
| `(inputWasTouched)` | Emitted each time the user (left) focus at `<uno-lookup />` Input box... As nothing will be triggered until user starts typing, this event could be helpful to track "somebody" was here, even without lookup for anything - i.e., for form's validation property 'ng-touched'. | EventEmitter\<any\> | |
| `(valueChange)` | Emitted, with current input value string, every time `value` changes (with a minimum delay of `debounce`). | EventEmitter\<string\> | |
| `(pickChange)` | Emitted each time the user selects/picks an Item form `<uno-lookup />` Dropdown - passing in the Object/String picked Item. | EventEmitter\<any\> | |
| `(scrollEndReached)` | Keeps tracking of the scroll position, inside the `<uno-lookup />` Dropdown, on the property `pos`. If the container's bottom/end limit is reached, property `endReached` of the Emitter comes true. | EventEmitter\<{pos: number, endReached: boolean}\> | |


### \<ng-template unoLookupHeader\> Directive Component

### (Template)
* Custom suggestion template for each `<uno-lookup />` Dropdown header title/message.

# \<ng-template unoLookupItem\> Directive Component

### (Template)
* Custom suggestion template for each `<uno-lookup />` Dropdown item.


