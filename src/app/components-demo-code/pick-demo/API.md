### \<uno-pick\>

#### UnoPick

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[unoPick]` | Currently picked/selected option. | any | |
| `[unoPickMultiple]` | Wether multiple options can be picked/selected. In the case, `unoPick` picked selections, becomes an Array of (pickeed) Objs. | boolean | false |
| `[unoPickActiveClass]` | Define a class to be applied (to the Option Item) when ANY of the options is selected. | string | |
| `(unoPickChange)` | When a `uno-pick-option` is clicked, emitts the value/array of Objs that are to be changed. | EventEmitter\<any\> | |

### \<button uno-pick-option\> Directive Component

* `unoPickOption`: `any` Object to pick option value.
* `unoPickActiveClass?`: `string` Define a class to be applied (to the Option Item) when THIS options is selected - will override parent's active class, if also defined.
