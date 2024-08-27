### \<uno-icon\>

#### UnoIcon

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[svgType]` | Defines the `uno-sprite` SVG sheet to get the icon from - url path is currently `assets/icons/uno-sprite/svg/${svgType}.svg#${icon}` | 'sprite' \| 'sprite-color' | 'sprite' |
| `[icon]` | The id name of the SVG icon to use, from a sheet of SVG icons. | string | |
| `[withOpacity]` | Indicates if the icon has `cursor:pointer`, rasing the opacity, `onHover`, form `0.6` to `1` - that's the default styling. No events are associated with the component, using this Input. | boolean | true |
| `[color]` | Defines the color (fill) | 'default' \| 'white' \| 'black' \| 'tomato-red' \| 'grey' \| 'green-menu' | 'default' |
| `[customColor]` | Defines a # color example #77dc01. | string | |
| `[size]` | Defines the icon size, from a pre-defined set, each associated with a Lightning System CSS `class` for the allowed measurements. | 'large' \| 'medium' \| 'small' \| 'x-small' | 'medium' |
