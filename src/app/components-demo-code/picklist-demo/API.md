### \<uno-picklist\>

#### UnoPicklist

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[open]` | Controls when to open/close the Dropdown of the `<uno-picklist />`. | boolean | |
| `[data]` | Data to be displayed as options in the Dropdown items list. | any[] | |
| `[isToOpenUp]` | Opens up (instead of the default down) the dropdown list, when configured at installation to true. | boolean | false |
| `[isForInlineTableCSS]` | Styles the trigger button with smaller lettering and height.
| `[insertBlankElement]` | Whether a <em>blank</em> element (once user chosen, will reset any current made option) is inserted, or not, at the top of `data` (dropdpown list). This Input will only have effect it it is NOT a `unoPickMultiple` option of `<uno-pick />` injected Directive - in this case, a second click, on a chosen/clicked option, will reverse it.  | boolean | |
| `[closeClickOutside]` | Whether the `<uno-picklist />` Dropdown should handle page events (e.g., clicking on the page closes the dropdown list). | boolean | |
| `[isDisabled]` | Whether `<uno-picklist />` Dropdown trigger (open/close) is disabled. | boolean | |
| `[fluid]` | Whether width of label and Dropdown of the `<uno-picklist />` inherit width of its content. | boolean | false |
| `[filterDataField]` | The method/field used to filter the displayed items of the Dropdown. If this Input is not declared, @ instalation, the  `<uno-picklist />` will NOT have a filter box. | string \| function \| '' | |
| `[filterPlaceholder]` | The placeholder string to display for the filter input field. | string | |
| `[listSizeForFilter]` | From what number of elements, of the Dropdown list, will filter box be avilable for the user. | number | 1 |
| `[showCheckBox]` | Shows a checkbox next to the name. | boolean | false |
| `(openChange)` | Whether the Dropdown is being opened or closed. | EventEmitter\<boolean\> | |
| `(userChangedFilter)` | When user is typing a Dropdown filtering, instalation can pick up the (string) changes and do a custom filtering function. | EventEmitter\<string\> | |
| `(selectedElem)` | Once Dropdown is being closed, by a user selection option, the emiited value by the Dropdown Directive it's an `HTMLElemnt` type - the one the user selected/chosen. | EventEmitter\<HTMLElement\> | |
| `(scrollEndReached)` | Keeps tracking of the scroll position, inside the `<uno-picklist />` Dropdown, on the property `pos`. If the container's bottom/end limit is reached, property `endReached` of the Emitter comes true. | EventEmitter\<{pos: number, endReached: boolean}\> | |

### Content possibilities

* `<ng-content />`
* `<ng-template uno-picklist-item />` Inject the `uno-picklist-item` Directive to render each option of the Dropdown


### \<uno-pick\>

Injecting it on `<uno-picklist />`, it allows to "pick", one or more elements, from all `uno-picklist-item` options rendered:
* `unoPick` Currently selected option value. If multiple is allowed, `unoPick` will be an array of "picked" items.
* `unoPickMultiple`: `boolean = false` Whether multiple options can be selected.
* `unoPickActiveClass`: `string` Define a custom class to be used when any of the options is selected



### \<ng-template  uno-picklist-item\>

Directive to render each option of the Dropdown injected @ `<uno-picklist />`.
