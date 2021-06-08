
// tslint:disable:max-line-length
// We want to export to a common collector ('_uno-smart-table-examples.files-code'), and for each UNO smart-table example at the demo lib app,
// the code (as a string, to be later highlighted by 'Prism' at each 'ExampleSectionComponent' <section />'s Tab.)
// of (each of) the HTML, TS, etc. files THIS Component is made of.
// So we need to "$ npm install raw-loader"
// After, create a "typings.d.ts" new file were we declare "!raw-loader!*"as a new module to immport the string on it.
// --------------------
// There's an exception: Prism does not handle *.md files to highlight them.
// On those, we use "$ npm install html-loader" and "$ npm install markdown-loader" and also add it as a new Module @ "typings.d.ts".

import * as TScode from '!raw-loader!./table-demo-collapsible.component';
import * as HTMLcode from '!raw-loader!./table-demo-collapsible.component.html';
// import * as APIcode from 'html-loader?minimize=false!markdown-loader!./API.md';

// And export the code string from them ALL:
export const lggType = { TS: TScode, HTML: HTMLcode}; // , MD_API: APIcode };
