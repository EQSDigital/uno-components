### \<span unoDropdown\>
#### UnoDropdown

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[open]` | Controls when to open/close the Dropdown. | boolean | |
| `[unoDropdownHandlePageEvents]` | Whether the Dropdown should handle page events (e.g., clicking on the page closes the dropdown). | boolean | |
| `(openChange)` | Whether the Dropdown is being opened or closed. | EventEmitter\<boolean\> | |
| `(selectedElem)` | Once Dropdown is being closed, by a user selection option, the emiited value by the Dropdown Directive it's an Object composed of the `HTMLElemnt` the user selected/chosen and the `idx` index clocked. | EventEmitter\<{ HTMLElement: HTMLElement, idx: number }\> | |

### \<button unoDropdownTrigger\>

Injecting it on ANY HTML 5 (event sensitive) tag, `<button unoDropdownTrigger />` will trigger the Dropdown, opening/closing it.
On this tag, we have access to all `<span unoDropdown />` Directive's Methods/Parameters like "open()", etc.

### \<a unoDropdownItem\>

Injecting it on ANY HTML 5 (list element) tag, `<li><a unoDropdownTrigger /></li>` will trigger, uppon an event, the Dropdown (unique) selection, closing it and handling the chosen selection object/tag.

> NOTE 1: `unoDropdown` it's NOT a <em>traditional</em> Angular component but an Angular <strong>Directive</strong>, to use @ ANY HTML 5 tag container.

> NOTE 2: please note that all (HTML 5 tag) attributes (like `type`, `disabled`, `hidden`, `autofocus`, `form`, etc.) can be used and will be natively rendered by any browser.
