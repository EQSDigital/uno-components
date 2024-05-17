export const routes = [
    {
        path: 'asset-visualizer',
        loadChildren: () => import('./asset-visualizer-demo/asset-visualizer-demo.module').then(m => m.AssetVisualizerDemoModule)
    },
    {
        path: 'badge',
        loadChildren: () => import('./badge-demo/badge-demo.module').then(m => m.BadgeDemoModule)
    },
    {
        path: 'banner',
        loadChildren: () => import('./banner-demo/banner-demo.module').then(m => m.BannerDemoModule),
        label: 'Banner'
    },
    {
        path: 'button',
        loadChildren: () => import('./button-demo/button-demo.module').then(m => m.ButtonDemoModule)
    },
    {
        path: 'circle-graph',
        loadChildren: () => import('./circle-graph-demo/circle-graph-demo.module').then(m => m.CircleGraphDemoModule),
        label: 'Circle Graph'
    },
    {
        path: 'color-pick',
        loadChildren: () => import('./color-pick-demo/color-pick-demo.module').then(m => m.ColorPickDemoModule),
        label: 'Color Pick'
    },
    {
        path: 'date-day',
        loadChildren: () => import('./date-day-demo/date-day-demo.module').then(m => m.DateDayDemoModule)
    },
    {
        path: 'date-weekdays',
        loadChildren: () => import('./date-weekdays-demo/date-weekdays-demo.module').then(m => m.DateWeekdaysDemoModule)
    },
    {
        path: 'date-year',
        loadChildren: () => import('./date-year-demo/date-year-demo.module').then(m => m.DateYearDemoModule)
    },
    {
        path: 'datepicker',
        loadChildren: () => import('./datepicker-demo/datepicker-demo.module').then(m => m.DatepickerDemoModule)
    },
    {
        path: 'datepicker2',
        loadChildren: () => import('./datepicker2-demo/datepicker2-demo.module').then(m => m.Datepicker2DemoModule)
    },
    {
        path: 'drag-drop-file',
        loadChildren: () => import('./drag-drop-file-demo/drag-drop-file-demo.module').then(m => m.DragDropFileDemoModule)
    },
    {
        path: 'dropdown',
        loadChildren: () => import('./dropdown-demo/dropdown-demo.module').then(m => m.DropdownDemoModule)
    },
    {
        path: 'icon',
        loadChildren: () => import('./icon-demo/icon-demo.module').then(m => m.IconDemoModule)
    },
    {
        path: 'image-cropper',
        loadChildren: () => import('./image-cropper-demo/image-cropper-demo.module').then(m => m.ImageCropperDemoModule)
    },
    {
        path: 'lookup',
        loadChildren: () => import('./lookup-demo/lookup-demo.module').then(m => m.LookupDemoModule)
    },
    {
        path: 'modal',
        loadChildren: () => import('./modal-demo/modal-demo.module').then(m => m.ModalDemoModule)
    },
    {
        path: 'pagination',
        loadChildren: () => import('./pagination-demo/pagination-demo.module').then(m => m.PaginationDemoModule)
    },
    {
        path: 'pick',
        loadChildren: () => import('./pick-demo/pick-demo.module').then(m => m.PickDemoModule)
    },
    {
        path: 'picklist',
        loadChildren: () => import('./picklist-demo/picklist-demo.module').then(m => m.PicklistDemoModule)
    },
    {
        path: 'picture',
        loadChildren: () => import('./picture-demo/picture-demo.module').then(m => m.PictureDemoModule)
    },
    {
        path: 'pill',
        loadChildren: () => import('./pill-demo/pill-demo.module').then(m => m.PillDemoModule)
    },
    {
        path: 'popover',
        loadChildren: () => import('./popover-demo/popover-demo.module').then(m => m.PopoverDemoModule)
    },
    {
        path: 'scroll-tracker',
        loadChildren: () => import('./scroll-tracker-demo/scroll-tracker-demo.module').then(m => m.ScrollTrackerDemoModule)
    },
    {
        path: 'search',
        loadChildren: () => import('./search-demo/search-demo.module').then(m => m.SearchDemoModule)
    },
    {
        path: 'switch',
        loadChildren: () => import('./switch-demo/switch-demo.module').then(m => m.SwitchDemoModule)
    },
    {
        path: 'tabs',
        loadChildren: () => import('./tabs-demo/tabs-demo.module').then(m => m.TabsDemoModule)
    },
    {
        path: 'tag-input',
        loadChildren: () => import('./tag-input-demo/tag-input-demo.module').then(m => m.TagInputDemoModule)
    },
    {
        path: 'table',
        loadChildren: () => import('./table-demo/table-demo.module').then(m => m.TableDemoModule)
    },
    {
        path: 'table-sample',
        loadChildren: () => import('./table-sample-demo/table-demo-sample.module').then(m => m.TableDemoSampleModule)
    },
    {
        path: 'table-nano',
        loadChildren: () => import('./table-nano-demo/table-demo-nano.module').then(m => m.TableNanoModule),
        label: 'Nano'
    },
    {
        path: 'table-collapsible',
        loadChildren: () => import('./table-collapsible-demo/table-demo-collapsible.module').then(m => m.TableDemoCollapsibleModule),
        label: 'Collapsible'
    },
    {
        path: 'table-risk-template',
        loadChildren: () => import('./table-risk-template-demo/table-demo-risk-template.module').then(m => m.TableDemoRiskTemplateModule),
        label: 'Risk Template'
    },
    {
        path: 'toast',
        loadChildren: () => import('./toast-demo/toast-demo.module').then(m => m.ToastDemoModule),
        label: 'Toast'
    }
];
