import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

import { DefaultEditorDirective } from 'projects/uno-ui-lib/src/lib/table';

@Component({
    template: `
        <div class="form-cell form-editor-custom-link">
            Name: <input [ngClass]="inputClass"
                    #name
                    class="form-control short-input"
                    [name]="cell.column.id"
                    [disabled]="!cell.column.isEditable"
                    [placeholder]="cell.column.title"
                    (click)="onClick.emit($event)"
                    (keyup)="updateValue()"
                    (keydown.enter)="enterToSave($event)"
                    (keydown.esc)="onStopEditing.emit()" />
                <br>
            Url: <input [ngClass]="inputClass"
                    #url
                    class="form-control short-input"
                    [name]="cell.column.id"
                    [disabled]="!cell.column.isEditable"
                    [placeholder]="cell.column.title"
                    (click)="onClick.emit($event)"
                    (keyup)="updateValue()"
                    (keydown.enter)="enterToSave($event)"
                    (keydown.esc)="onStopEditing.emit()" />
        </div>
        <div [hidden]="true" [innerHTML]="cell.getValue()" #htmlValue></div>
    `,
})
export class EditorLinkComponent extends DefaultEditorDirective implements AfterViewInit {

    @ViewChild('name') name: ElementRef;
    @ViewChild('url') url: ElementRef;
    @ViewChild('htmlValue') htmlValue: ElementRef;

    constructor() {
        super();
    }

    ngAfterViewInit() {
        if (this.cell.newValue !== '') {
            this.name.nativeElement.value = this.getUrlName();
            this.url.nativeElement.value = this.getUrlHref();
        }
    }

    updateValue() {
        const href = this.url.nativeElement.value;
        const name = this.name.nativeElement.value;
        this.cell.newValue = `<a href='${href}' target='_blank'>${name}</a>`;
    }

    getUrlName(): string {
        return this.htmlValue.nativeElement.innerText;
    }

    getUrlHref(): string {
        const hrefLink = this.htmlValue.nativeElement.querySelector('a');
        return hrefLink ? hrefLink.getAttribute('href') : '';
    }

    // Bindings for the DEMO App:
    enterToSave(evt) {
        console.log('Saved values: ', this.cell.newValue);
        this.onEdited.emit(evt);
    }
}
