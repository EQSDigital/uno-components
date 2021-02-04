### \<a uno-popover-trigger\>

#### UnoPopover

`<uno-popover />`, allthough it's <em>traditional</em> Angular component of the UNO ui library, it's not <em>drawn</em> by us, at the HTML.
Instead, we choose any HTML 5 tag trigger and inject `uno-popover-trigger` Angular <strong>Directive</strong> in it, along with an `<ng-template />` where we'll <em>draw</em> it's HTML content
&#45; in the simplest case a pure `string` can be passed in to be displayed at the `<uno-popover />`, once triggered.

### Input Directives

* `unoPopover`: `string | TemplateRef<any>` The HTML (or plain `string`) content of the `<uno-popover />`, to show once triggered.
* `unoPopoverOpen`: `boolean` Controls when to diplay/hide `<uno-popover />`
* 
* `unoPopoverTooltip?`: `boolean = 'false'` Wether `<uno-popover />` looks, and behaves, like a <em>traditional</em> tooltip
* `unoPopoverTheme?`: `'default' | 'success' | 'warning' | 'info' | 'error' | 'offline' | 'inverse-text' | 'shade' | 'inverse' | 'alt-inverse' = 'default'` The style of the popover, each associated with a `Design Lightning System` CSS `class` (<strong>slds-theme--XXXXXX</strong>) that will define colors, borders, paddings, etc. of the `uno-popover-trigger` content.
* `unoPopoverHeader?`: `string` States our `<uno-popover />` will have a Header HTML5 tag, with `string` (plain) content.
* `unoPopoverFooter?`: `string` States our `<uno-popover />` will have a Footer HTML5 tag, with `string` (plain) content.
* 
* `unoPopoverTemplate?`: `'defaultContent' | 'infoContent' | 'downloadContent' | 'datePickerContent' = 'defaultContent'` Specifies a fixed, pre-defined, type of HTML 5 template this popover will use on its content.
* `unoPopoverTemplateData?`: `any` Passes in DATA, on an Object of property-vars, to filled chosen type of HTML template's fixed, pre-defined, curly braces (or any other inner Input) vars.
* 
* `unoPopoverPlacement?`: `'top' | 'topLeft' | 'topRight' | 'right' | 'rightTop' | 'rightBottom' | 'bottom' | 'bottomLeft' | 'bottomRight' | 'left' | 'leftTop' | 'leftBottom' = 'top'` Precise position, assured by [$ npm install tether](https://www.npmjs.com/package/tether), of the opened `<uno-popover />` relatively to its defined trigger. Please note the <strong>camelCase notation</strong> of the input directive!
* `unoPopoverNubbin?`: `'top' | 'top-left' | 'top-right' | 'right' | 'right-top' | 'right-bottom' | 'bottom' | 'bottom-left' | 'bottom-right' | 'left' | 'left-top' | 'left-bottom' = 'bottom'` Position of the `uno-popover` indicator, relatively to its opened `uno-popover`, each associated with a `Design Lightning System` pseudo-elemnt (`:after` | `:before`) CSS `class` (<strong>slds-nubbin--XXXXXX</strong>). Please note the <strong>CSS notation</strong> of the input directive!
* 
* `unoPopoverSize`: `'small' | 'medium' | 'large' = 'medium'` Specifies size boundaries (`min-width` and/or `max-width`) of the `<uno-popover />`, each associated with a `Design Lightning System` CSS `class` (<strong>slds-popover--XXXXXX</strong>) 
* 
* `unoPopoverInteractive?`: `boolean` Wether our `<uno-popover />` HTML's <strong>&#60;ng-template /&#62;</strong> content have mouse events (like links) on it - `unoPopoverInteractive="true"` DOES NOT close popover, when you move out of the trigger (as an ordinary "tooltip" does)
* `unoPopoverDelay?`: `number` Besides an eventual UI/UX desired (open delayed) effect, some delay is advisable when you play with <em>mouseenter</em>/<em>mouseleave</em> - gives the component "time" to know if it should close, or not, the popover.

### Output Directives

* `unoPopoverToggled`: `boolean` Event emitter when current `<uno-popover />` becomes visible/hidden.
* `unoPopoverTemplateEvent`: `templateEventEmited($event)` Event emitter when any event happens inside ANY `<uno-popover />` who's content is a specific designed Template - obj `$event` passed in has information about in what Template the event happened and, inside it, what was the element (icon, button, div, etc.) that suffer the event.


# <`a unoPopoverBehavior` />

### Input Directives

On Behavior Directive, we have access to all `<a uno-popover-trigger />` Directive's Methods/Parameters like "unoPopover", "unoPopoverHeader", "unoPopoverOpen()", etc.
Injecting it on our `<a uno-popover-trigger />` trigger HTML 5 tag, we don't need to specify <em>mouseenter</em>/<em>mouseleave</em> coding or any Input <em><strong>unoPopoverOpen</strong></em> TS var/coding.

# <`a uno-popover-click-behavior` />

### Input Directives

Injecting it on our `<a uno-popover-trigger />` trigger HTML 5 tag, we don't need to specify any <em>click</em> coding or any Input <em><strong>unoPopoverOpen</strong></em> TS var/coding.
Trigger tag will (toggle) open/close the popover at each `click`.
Besides clicking outside, clicking on an inside `<uno-icon icon="close" size="x-small" class="popover-close-icon"></uno-icon>` element, will also CLOSE the popover.
