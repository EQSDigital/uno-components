### \<uno-tabs\>
#### UnoTabs

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[selected]` | The tab to activate. This can be either the `index` number, the `tab's id` *(unoTabId="myid")* or the actual `TabDirective` instance. | number \| string \| TabDirective | |
| `[type]` | Whether the tabset is [scoped](https://www.lightningdesignsystem.com/components/tabs#scoped) or not. | 'default' \| 'scoped' | 'default' |
| `[alignment]` | Wether tabs are grouped at the left or at the right side of `<uno-tabs />`. | 'left' \| 'right' | 'left' |
| `[activeTabDashColor]` | Allows custom active tab's dash color (actually background-color of active's li::after pseudo-element). This string CAN NOT be a CSS var as pseudo-element style customization is already made by passing in a (this one!) CSS var. As so, be advised that this costumization is completely free, as long as it's a valid browser color var/string. | string | |
| `(selectedChange)` | Emits the clicked tab in order to activate. | EventEmitter\<TabDirective\> | |


### \<ng-template unoTab\>
#### UnoTab

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[unoTabId]` | Tab's ID in case you want to preselect or programmatically manipulate it. | string | |
| `[heading]` | Tab's header/title text. | string |
| `[headingSub]` | Tab's sub-title text, to be displayed under (and with less visibility) the tab's header/title text. | string | |
| `[headingNaturalCase]` |By default tab's header/title text are uppercase; this directive allows it to be displayed at it's own natural case (as HTML written). | boolean | |
| `[bgColorHeading]` | Defines the background color of the tab HEADING/TITLE from `uno-palette.css` (CSS known var namespace). | string | |
| `[txtColorHeading]` | Defines the color (text) of the tab HEADING/TITLE from `uno-palette.css` (CSS known var namespace). | string | |
| `[bgColorContent]` | Defines the background color of the tab CONTENT from `uno-palette.css` (CSS known var namespace). | string | |
| `[txtColorContent]` | Defines the color (text) of the tab CONTENT from `uno-palette.css` (CSS known var namespace). | string | |
| `[bgheightContent]` | Defines the background height of the tab CONTENT. | string | |

### \<uno-tab\>
#### UnoTab

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[unoTabHeading]` | Structural Directive saying to the `<unoTab />` Directive it will handle the Tab title/header | | |
| `[unoTabContent]` | Structural Directive saying to the `<unoTab />` Directive it will handle the Tab content | |