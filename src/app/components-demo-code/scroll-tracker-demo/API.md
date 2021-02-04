### \<div unoScrollTracker\>

#### UnoScrollTracker

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `(scrollEndReached)` | Keeps tracking of the scroll position, inside the container, on the property `pos`. If the container's bottom/end limit is reached property `endReached` of the Emitter comes true. | EventEmitter\<{pos: number, endReached: boolean}\> | |

> It fires an event once the container (bottom) limit is reached, if mouse/finger scroll is allowed/used.

> NOTE 1: `unoScrollTracker` it's NOT a <em>traditional</em> Angular component but an Angular <strong>Directive</strong>, to use @ ANY HTML's (container) tag.

> NOTE 2: please note that all (HTML 5 tag) `unoScrollTracker` container attributes (like `type`, `disabled`, `hidden`, `autofocus`, `form`, etc.) can be used and will be natively rendered by any browser.
