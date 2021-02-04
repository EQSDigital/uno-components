### \<button unoButton\>

#### UnoButton

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[unoType]` | The style of the button to use, each associated with a `nano.base.css` CSS `class` that will define colors, borders, paddings, etc of the `unoButton`. | 'secondary' \| 'blue' \| 'green' \| 'worksheet-default' \| 'worksheet-add' | |
| `[unoSize]` | Defines the button size, from a pre-defined set, each associated with a `nano.base.css` CSS `class` for the allowed measurements to be passed to the unoButton. | 'small' \| 'x-small' | |


> NOTE 1: `unoButton` it's NOT a <em>traditional</em> Angular component but an Angular <strong>Directive</strong>, to use @ HTML's <`button` /> tag.

> NOTE 2: please note that all (HTML 5 tag) `<button />` attributes (like `type`, `disabled`, `hidden`, `autofocus`, `form`, etc.) can be used and will be natively rendered by any browser.
