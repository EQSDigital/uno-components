import { Directive, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
    selector: '[unoScrollTracker]',
})
export class ScrollTrackerDirective {

    @Output() scrollEndReached = new EventEmitter<any>();

    @HostListener('scroll', ['$event'])
    onScroll(event: any) {
        // Listen to scroll events in the component
        const tracker = event.target;
        const bottomLimit = tracker.scrollHeight - tracker.clientHeight;
        let endReached = false;

        if (tracker.scrollTop >= bottomLimit) {
            endReached = true;
        }

        this.scrollEndReached.emit(
            {
                pos: event.target.scrollTop,
                endReached: endReached
            }
        );
    }
}
