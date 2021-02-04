declare module '!raw-loader!*' {
    const contents: string;
    export = contents;
}

// For *.md content, like README.md, API.md, etc.:
declare module 'html-loader?minimize=false!markdown-loader!*' {
    const contents: string;
    export = contents;
}