### \<uno-pagination\>
#### UnoPagination

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[numItems]` | The length of the total number of items that are being paginated. | number | 0 |
| `[pageSize]` | Number of items to display on a page. | number | 10 |
| `[pageIndex]` | The zero-based page index of the displayed list of items. | number | 0 |
| `[pageSizeOptions]` | The set of provided page size options to display to the user. | number[] | [10, 25, 50] |
| `(page)` | Emits when the pagination changes the page size or page index. | EventEmitter\<PageEvent\> | |
