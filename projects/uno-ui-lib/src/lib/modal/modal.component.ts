import {
    Component, ChangeDetectionStrategy, OnInit, OnDestroy, Input, Output, EventEmitter,
    ContentChild, HostListener, ElementRef, Renderer2, ChangeDetectorRef, OnChanges, SimpleChanges, AfterContentInit, Inject
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import { BlockScrollStrategy, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ConfigurableFocusTrapFactory, FocusTrap } from '@angular/cdk/a11y';
import { Subscription } from 'rxjs';

import { InputBoolean, toBoolean, uniqueId } from '../../util/util';
import { ModalHeaderDirective } from './header.directive';
import { ModalFooterDirective } from './footer.directive';

interface DropDownSelector {
    id: number;
    name: string;
    // Boolean telling dropdown selector to open or not:
    opened: boolean;
    color: string;
}

@Component({
    selector: 'uno-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalComponent implements OnInit, OnChanges, AfterContentInit, OnDestroy {
    // To save time @ component's instalation, we have already prepared HTML templates for certain, often used, Modals:
    @Input() templateType: 'successModal' | 'warningModal' | 'confirmDelModal' | 'confirmActionModal' | 'assets3DModal' | 'docsUploadModal' | 'sscUploadModal' | '';
    @Input() templateCustomMsg: string;       // Can be an HTML string
    // Exclusively for assets3DModal Template (should, at least, have property 'name'), the scenes Array:
    @Input() scenes3D: any[];
    @Input() docTypeSelector: any[];    // Observable<NanoModels.NanoDropdownDto[]>;
    @Input() docStatusSelector: any[];  // Observable<NanoModels.NanoDropdownDto[]>;
    @Input() docResultSelector: any[];  // Observable<NanoModels.NanoDropdownDto[]>;
    @Input() sscStatusSelector: any[];  // Observable<NanoModels.NanoDropdownDto[]>;
    formErrorsObservable: Subscription;
    // Object with all form's drop down selectors, each with an Id and a Name
    dD = {} as { [key: string]: DropDownSelector };

    // Let the instalation state the path for each modal template's image/icon/svg, providing a default one
    @Input() templateIconPath = 'assets/images/default-modal-template-icon.svg';

    @Input() size: 'large'; // By default - no Input() passed in - it's small.
    // Passed input can ONLY be 'large', triggering a Lightning System (only) size class.

    // Certain Nano Templated modals (basically the warning/success ones), are shorter, by design demands (see ngOnInit()):
    @Input() smallerModal = false;

    @Input() headerStr = '';
    @Input() subHeaderStr = '';
    @Input() headerAlign: 'left' | 'center' | 'right' = 'left';
    headingId = uniqueId('modal-heading');
    contentId = uniqueId('modal-content');
    @Input() modalIsDeaf = false;
    @Input() editData: any;
    @Input() showDate = true;
    @Input() showExpiredDate = false;
    @Input() showTag = true;
    @Input() showComment = true;
    @Input() showType = true;
    @Input() showSSCType = false;
    @Input() showName = true;

    @Input() disableSSCType = false;
    @Input() disableInputFile = false;
    @Input() disableInputName = false;
    @Input() disableSSCDate = false;
    @Input() disableSSCStatus = false;
    @Input() disableDescription = false;
    @Input() disableComments = false;

    @Input() fileSize: number;
    @Input() acceptedTypes = '*/*';

    @Input() documentMinDate: any;
    @Input() documentMaxDate: any;

    @Input() expireMinDate: any;
    @Input() expireMaxDate: any;

    // LABELS
    // actionAccomplishedSuccess = 'Your action was accomplished with success!';
    // confirmAction = 'Please confirm your action...';
    // proceedWithDeletion= 'Are you sure you want to proceed with deletion...?';
    // actionNotMeetingCurrentSpecifications = 'Your action is not meeting current specifications!';
    // chooseFileUpload = 'Choose a file to upload.';
    // successTitle = 'Success';
    // warningTitle = 'Warning!';
    // confirmTitle = 'Please Confirm!';
    // deleteSubTitle = 'are you Sure you Wish to Delete?';
    // okLabel = 'OK';
    // deleteLabel = 'DELETE';
    // proceedLabel = 'PROCEED';
    // cancelLabel = 'CANCEL';

    // sceneNameLabel = 'Scene name...?';
    // chooseFileLabel = 'Choose File';
    // nameLabel = 'Name';
    // tagLabel = 'Tag';
    // documentTypeLabel = 'Document Type';
    // documentStatusLabel = 'Document Status';
    // selectItemLabel = 'Select an Item...';
    // chooseDateLabel = 'Choose a date...';
    // documentDateLabel = 'Document Date';
    // documentResultLabel = 'Document Result';
    // commentsLabel = 'Comments - ';
    // optionalLabel = 'Optional';
    // insertTag = 'Insert Tag';
    // insertName = 'Insert Name';
    // insertDescription = 'Insert Descrtiption';
    // insertComments = 'Insert Comments';

    @Input() sscStatusLabel = 'sscStatusLabel';
    // expireDateLabel = 'Expire Date';
    // descriptionLabel = 'Description ';

    // ======================================
    private _separateButtons = true;
    @Input() set separateButtons(separateButtons: string | boolean) {
        this._separateButtons = toBoolean(separateButtons);
    }
    get separateButtons() {
        return this._separateButtons;
    }
    // ======================================
    @Input() @InputBoolean() open = true;
    // ======================================
    // Exclusively for 'docsUploadModal' template:
    private _resetForm: boolean;
    @Input() set resetForm(_resetForm: any) {
        _resetForm = toBoolean(_resetForm);
        if (_resetForm === this.resetForm) {
            return;
        }

        this._resetForm = _resetForm;
        if (_resetForm === true) { this.resetUploadForm(); }
    }
    get resetForm() {
        return this._resetForm;
    }

    private _submitForm: boolean;
    @Input() set submitForm(_submitForm: any) {
        _submitForm = toBoolean(_submitForm);
        if (_submitForm === this.submitForm) {
            return;
        }

        this._submitForm = _submitForm;
        if (_submitForm === true) { this.formSubmitionData.emit(this.uploadForm.value); this.resetUploadForm(); }
    }
    get submitForm() {
        return this._submitForm;
    }

    // ======================================

    @Output() openChange = new EventEmitter();
    @Output() clickedButton = new EventEmitter();
    // Exclusively for assets3DModal Template
    @Output() selected3DScene = new EventEmitter();
    // Exclusively for 'docsUploadModal' template:
    // @Output() imageUploaded = new EventEmitter();
    @Output() selectedTypeEmitter = new EventEmitter();
    @Output() formValidation = new EventEmitter();
    @Output() formSubmitionData = new EventEmitter();
    @Output() closeOutside = new EventEmitter();

    @ContentChild(ModalHeaderDirective) headerDirective: ModalHeaderDirective;
    @ContentChild(ModalFooterDirective) footerDirective: ModalFooterDirective;

    openModalAssets3d: boolean;
    openModalDocsUpload: boolean;
    openModalSmall: boolean;
    openModalLarge: boolean;
    openModalSuccess: boolean;
    openModalWarning: boolean;
    openModalConfirmDel: boolean;
    openModalConfirmAction: boolean;

    datePickerData: any;

    datePickerExpiredData: any;

    // Exclusively for 'docsUploadModal' template:
    public uploadForm: FormGroup;

    public fileName: any;
    public sscFileName: any;

    public resetDatePicker = false;

    public fileUploadIsToBig = false;

    private focusTrap: FocusTrap;

    private container: OverlayRef;

    private elementFocusedBeforeDialogWasOpened: HTMLElement | null = null;

    private scrollStrategy: BlockScrollStrategy;

    constructor(
        private fb: FormBuilder,
        private modalDOM: ElementRef,
        private renderer: Renderer2,
        private cdRef: ChangeDetectorRef,
        private focusTrapFactory: ConfigurableFocusTrapFactory,
        @Inject(DOCUMENT) private document: any,
        private overlay: Overlay,
        private element: ElementRef
    ) {
        this.scrollStrategy = this.overlay.scrollStrategies.block();
    }

    ngOnInit() {
        // See if installation is demanding a sort of Template that uses a smaller (less wide) modal:
        this.smallerModal = (
            this.templateType === 'successModal'
            || this.templateType === 'warningModal'
            || this.templateType === 'confirmDelModal'
            || this.templateType === 'confirmActionModal'
            || this.templateType === ''
        ) ? true : false;

        // In case the template chosen is 'docsUploadModal' we need to set up an Angular Reactive Form (uploadForm):
        if (this.templateType === 'docsUploadModal' || this.templateType === 'sscUploadModal') {
            // Set each form's Input/selector init value, validators, disableds, etc.:
            this.uploadForm = this.fb.group({
                name: ['', [Validators.minLength(3), Validators.required]],
                tag: [''],
                sscStatus: [''],
                documentType: ['', Validators.required],
                documentStatus: [''],
                documentDate: [],
                expiredDate: [null],
                documentResult: [''],
                description: ['', Validators.minLength(3)],
                comments: ['', Validators.minLength(3)],
                uploadedFile: [null, Validators.required]
            });

            // ... and Subscribe (to emit back) to any form changes/validation, so we can take action @ component's installation:
            this.formErrorsObservable = this.uploadForm.statusChanges.subscribe(
                (formStatus) => {
                    if (formStatus === 'INVALID') {
                        this.formValidation.emit(false);
                    } else {
                        this.formValidation.emit(true);
                    }
                }
            );

            // Account for each/all dropdowns selectors we'll have on this Reactive Form:
            this.initDropDowns();
            this.cdRef.detectChanges();
        }

    }

    ngOnChanges(changes: SimpleChanges) {
        this.fileName = null;
        this.datePickerExpiredData = null;
        if (changes.open) {
            this.handleOpen();
        }

        if (changes.editData && this.editData) {
            setTimeout(() => {
                if (this.editData.file || this.editData.documentFileName) {
                    this.uploadForm.controls.uploadedFile.clearValidators();
                    this.uploadForm.controls.uploadedFile.updateValueAndValidity();
                }
                this.uploadForm.controls.name.setValue(this.editData.name);
                this.uploadForm.controls.tag.setValue(this.editData.documentTag);

                if (this.editData.documentType) {
                    this.uploadForm.controls.sscStatus.clearValidators();
                    this.uploadForm.controls.sscStatus.updateValueAndValidity();
                    this.dD['docType'] = { id: this.editData.documentType.id, name: this.editData.documentType.name, opened: false, color: null };
                    this.uploadForm.controls.documentType.setValue(this.editData.documentType);
                    this.selectedTypeEmitter.emit(this.editData.documentType);
                }

                if (this.editData.documentStatus) {
                    if (this.editData.documentStatus.color) {
                        this.dD['sscStatus'] = { id: this.editData.documentStatus.id, name: this.editData.documentStatus.name, color: this.editData.documentStatus.color, opened: false };
                        this.uploadForm.controls.sscStatus.setValue(this.editData.documentStatus);
                    } else {
                        this.dD['docStatus'] = { id: this.editData.documentStatus.id, name: this.editData.documentStatus.name, opened: false, color: null };
                        this.uploadForm.controls.documentStatus.setValue(this.editData.documentStatus);
                    }
                }

                if (this.editData.documentResult) {
                    this.dD['docResult'] = { id: this.editData.documentResult.id, name: this.editData.documentResult.name, opened: false, color: null };
                    this.uploadForm.controls.documentResult.setValue(this.editData.documentResult);
                }

                this.uploadForm.controls.documentDate.setValue(this.editData.documentDate);
                this.uploadForm.controls.description.setValue(this.editData.description);
                this.uploadForm.controls.comments.setValue(this.editData.comments);

                if (this.editData.expiredDate) {
                    const date = new Date(this.editData.expiredDate);
                    this.datePickerExpiredData = date;
                    this.uploadForm.controls.expiredDate.setValue(date);
                }

                if (this.editData.documentFileName) {
                    this.fileName = this.editData.documentFileName;
                }
            });
        }

        if (changes.docStatusSelector && this.docStatusSelector) {
            this.uploadForm.controls.documentStatus.setValidators(Validators.required);
            this.uploadForm.controls.documentStatus.updateValueAndValidity();
        }

        if (changes.docResultSelector && this.docResultSelector) {
            this.uploadForm.controls.documentResult.setValidators(Validators.required);
            this.uploadForm.controls.documentResult.updateValueAndValidity();
        }

    }

    ngAfterContentInit() {
        this.handleOpen();
    }

    ngOnDestroy() {
        this.handleOpen(false);
        this.scrollStrategy = null;

        if (this.formErrorsObservable) {    // In case the template chosen is 'docsUploadModal'
            this.formErrorsObservable.unsubscribe();
        }
    }

    initDropDowns() {
        this.dD['docType'] = { id: null, name: null, opened: false, color: null };
        this.dD['docStatus'] = { id: null, name: null, opened: false, color: null };
        this.dD['docResult'] = { id: null, name: null, opened: false, color: null };
        this.dD['sscStatus'] = { id: null, name: null, opened: false, color: null };
    }

    /**
     * Listen for "esc" key pressed by user to close opened Modal
     *
     * @param evt
     */
    @HostListener('keydown.esc', ['$event'])
    close(evt: Event) {
        if (!this.modalIsDeaf) {
            evt.stopPropagation();
            this.openChange.emit(false);
        }
    }

    /**
     * Listen for "click" outside Modal to close opened Modal
     *
     * @param evt
     */
    @HostListener('click', ['$event'])
    stopPropagation(evt: Event) {
        if (!this.modalIsDeaf) {
            evt.stopPropagation();
            const target: any = evt.target;

            if (target.closest('.slds-modal__content') === null) {
                this.openChange.emit(false);
                this.fileName = null;
                this.resetUploadForm();
                this.closeOutside.emit();
            }
        }
    }

    modalClose(action: string) {
        this.open = !this.open;
        // Close it:
        this.openChange.emit(false);
        // Emit back:
        this.clickedButton.emit(action);
    }

    // ===========================================
    // Exclusively for assets3DModal Template;
    // ===========================================
    onSelectingScene(sceneIdx: number) {
        this.selected3DScene.emit(sceneIdx);
    }

    // ===========================================
    // Exclusively for 'docsUploadModal' template:
    // ===========================================
    // Updates Dropdowns selected value and corresponding form controller, with each user selection:
    updateWithSelectedOption(selectorName: string, selectedItem: any, formControlName: string) {
        // Update Name and Id of the selector Global var:
        this.dD[selectorName].id = selectedItem.id;
        this.dD[selectorName].name = selectedItem.name;
        // ... and the uploadForm Controller's value:
        this.uploadForm.controls[formControlName].setValue(selectedItem);
        if (selectorName === 'docType') {
            this.uploadForm.controls.documentStatus.clearValidators();
            this.uploadForm.controls.documentResult.clearValidators();
            this.uploadForm.controls.sscStatus.clearValidators();
            this.uploadForm.controls.documentResult.updateValueAndValidity();
            this.uploadForm.controls.documentStatus.updateValueAndValidity();
            this.uploadForm.controls.sscStatus.updateValueAndValidity();
            this.uploadForm.controls.documentStatus.setValue(null);
            this.uploadForm.controls.documentResult.setValue(null);
            this.dD['docStatus'] = { id: null, name: null, opened: false, color: null };
            this.dD['docResult'] = { id: null, name: null, opened: false, color: null };
            this.selectedTypeEmitter.emit(selectedItem);
        }

        if (selectorName === 'sscStatus') {
            this.dD[selectorName].color = selectedItem.color;
            this.uploadForm.controls.documentType.clearValidators();
            this.uploadForm.controls.documentType.updateValueAndValidity();
        }
    }

    // Clones the "formControlName" Angular Reactive Form Input's (hidden) dynamic classes (ng-valid, ng-touched...) into our UNO component
    // - "unoDropdownTrigger" in this form's case:
    cloneHiddenInputClasses(buttonIdx: number) {
        if (buttonIdx) {
            const unoModal = this.modalDOM.nativeElement;
            // The dropdown trigger will be colorfull! ;-)
            const unoDropdownButton: HTMLElement = unoModal.querySelectorAll('.uno-dropdown')[buttonIdx];
            // There's only ONE <input type="hidden"> for each uno-dropdown:
            const fakeHiddenInput: HTMLElement = unoDropdownButton.querySelector('input');
            // Must fix initial "unoDropdownTrigger" button classes:
            const fixedUnoDropdownClasses = 'slds-input form-control uno-dropdown ';
            // Watch the trailing ' ' at the end! We'll be working with "classList" (strings!)

            // Make it assynchronous, waiting for the Angular Form to work on Validator's classes:
            setTimeout(() => this.renderer.setAttribute(
                unoDropdownButton, 'class', fixedUnoDropdownClasses + fakeHiddenInput.getAttribute('class')
            ));
        }
    }

    /**
     * Our HTML5 doc uploaded Input changes:
     */
    fileToUploadChange(evt: File) { // In fact it's an EVENT and NOT a FILE - but somebody imposes Filter properties!
        this.fileUploadIsToBig = false;
        const selectedFile = evt['target'].files[0];

        if (this.fileSize && selectedFile.size >= this.fileSize) {
            this.fileUploadIsToBig = true;
            return;
        }

        this.fileName = selectedFile.name || '(none)';
        this.uploadForm.controls.uploadedFile.setValue(evt);
    }


    // As an Input() parameter to <uno-modal />, you can reset the 'docsUploadModal' template from the (exterior) instalation side:
    resetUploadForm() {
        // The Inputs, Selects and Textareas:
        this.datePickerExpiredData = null;
        this.datePickerData = null;
        this.resetDatePicker = true;
        // Now the uno-dropdowns:
        this.initDropDowns();
        // ... not forgeting the file upload fancy boxing!
        // There's only ONE:
        this.fileName = null;
        if (this.uploadForm) {
            this.uploadForm.reset();
            this.uploadForm.controls.uploadedFile.setValidators(Validators.required);
            this.uploadForm.controls.uploadedFile.updateValueAndValidity();
        }
    }

    /**
     * Method to set new date on the form
     *
     * @param event - New Date selected
     */
    templateEventEmited(event: string) {
        if (event && event !== 'invalid') {
            this.uploadForm.controls.documentDate.setValue(event);
        } else if (event === 'invalid') {
            this.uploadForm.controls.documentDate.setErrors({ invalid: true });
        } else {
            this.uploadForm.controls.documentDate.setValue(null);
        }
        this.resetDatePicker = false;
    }

    expireDateEmited(event: string) {
        if (event && event !== 'invalid') {
            this.uploadForm.controls.expiredDate.setValue(event);
        } else if (event === 'invalid') {
            this.uploadForm.controls.expiredDate.setErrors({ invalid: true });
        } else {
            this.uploadForm.controls.expiredDate.setValue(null);
        }
        this.resetDatePicker = false;
    }

    /**
     * Method to remove file from form and reset file name
     */
    removeFile() {
        this.uploadForm.controls.uploadedFile.setValue(null);
        this.fileName = null;
    }

    private handleOpen(open = this.open) {
        if (open) {
            if (this.document) {
                this.elementFocusedBeforeDialogWasOpened = this.document.activeElement as HTMLElement;
            }

            this.container = this.overlay.create();

            this.container.overlayElement.appendChild(this.element.nativeElement);

            this.focusTrap = this.focusTrapFactory.create(this.element.nativeElement);
            this.focusTrap.focusInitialElementWhenReady();
            this.scrollStrategy.enable();
        } else {
            if (this.elementFocusedBeforeDialogWasOpened && typeof this.elementFocusedBeforeDialogWasOpened.focus === 'function') {
                this.elementFocusedBeforeDialogWasOpened.focus();
            }

            if (this.container) {
                this.container.dispose();
                this.container = null;
            }

            if (this.focusTrap) {
                this.focusTrap.destroy();
            }

            this.scrollStrategy.disable();
        }
    }
}
