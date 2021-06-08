import { HostListener, Directive } from '@angular/core';

@Directive()
export class ClickOutsideDefault {

    openValidatorPopover = false;

    // Detect if user is clicking INside or OUTside of THE Component that EXTENDS this Class:
    clickWasInside = false;

    @HostListener('click')
    clickInside() {
        this.clickWasInside = true;
    }

    @HostListener('document:click', ['$event'])
    clickOutside(evt) {
        // <uno-lookup /> internal structure is unknown, for the browser - i.e. the Input box.
        // If click was somewhere inside it (Input box, icon, container, etc.), consider it as "Inside".
        // Rememebr @HostListener() only supports "window", "document", and "body" as global event targets.
        // Otherwise, the "click()" is considered inside the component's host element - not any other than the above
        const path = event['path']
            // beacause of browser compatibilities:
            || (event['composedPath'] && event['composedPath()']),
            toFind = document.querySelectorAll('uno-lookup.form-control')[0];

        path.forEach(elem => {
            if (elem === toFind) {
                this.clickWasInside = true;
            }
        });

        if (!this.clickWasInside) {
            this.openValidatorPopover = false;
        }
        this.clickWasInside = false;
    }
}
