import {
    Directive,
    ElementRef,
    EventEmitter,
    HostListener,
    Input,
    OnChanges,
    OnInit,
    Output,
    Renderer2,
    SimpleChange,
    SimpleChanges
} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {init} from 'protractor/built/launcher';

@Directive({
    selector: '[slider]'
})
export class MovableDirective implements OnInit, OnChanges {

    @Input('value') value: number = 0;
    @Input('update-rate') update_rate: number = 0;

    @Output('change') change = new EventEmitter<number>();

    private mouse_down: boolean = false;
    private touch_down: boolean = false;

    private element_origin = 0;
    private container_height = 0;

    private update_counter = 0;

    private onChanges = new BehaviorSubject<SimpleChanges>(null);

    private initialized: boolean = false;

    constructor(private element: ElementRef,
                private renderer: Renderer2) {
    }

    ngOnInit() {
        this.element_origin = this.element.nativeElement.getBoundingClientRect().y;
        this.container_height = this.element.nativeElement.parentNode.offsetHeight - this.element.nativeElement.offsetHeight;

        const mapped = this.mapToRange(this.value,
            100, 0,
            this.element.nativeElement.offsetHeight / 2 + this.element_origin,
            this.container_height + this.element.nativeElement.offsetHeight / 2 + this.element_origin);
        this.moveElement(100 - mapped);

        this.onChanges.subscribe(
            (change) => {
                const mapped = this.mapToRange(change.value.currentValue,
                    100, 0,
                    this.element.nativeElement.offsetHeight / 2 + this.element_origin,
                    this.container_height + this.element.nativeElement.offsetHeight / 2 + this.element_origin);
                this.moveElement(mapped);
            }
        );
        this.initialized = true;
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.value = changes.value.currentValue;
        const mapped = this.mapToRange(this.value,
            100, 0,
            this.element.nativeElement.offsetHeight / 2 + this.element_origin,
            this.container_height + this.element.nativeElement.offsetHeight / 2 + this.element_origin);
        this.moveElement(mapped);
        if (!this.initialized) {
            this.onChanges.next(changes);
        }
    }

    @HostListener('mousedown', ['$event'])
    onMouseDown(event: MouseEvent) {
        this.mouse_down = true;
    }

    @HostListener('mousemove', ['$event'])
    onMouseMove(event: MouseEvent) {
        if (this.mouse_down) {
            const mouse_y = event.clientY;
            // todo

            if (mouse_y < this.container_height && mouse_y > this.element_origin) {
                this.change.emit(this.moveElement(mouse_y));
            }
        }
    }

    @HostListener('mouseup', ['$event'])
    onMouseUp(event: MouseEvent) {
        this.mouse_down = false;
    }


    @HostListener('touchstart', ['$event'])
    onTouchStart(event: TouchEvent) {
        // console.log(event);
        this.touch_down = true;
    }

    @HostListener('touchmove', ['$event'])
    onTouchMove(event: TouchEvent) {
        if (this.touch_down) {
            const value = this.moveElement(event.touches[0].clientY);
            if (this.update_counter % this.update_rate === 0) {
                this.change.emit(value);
                this.update_counter = this.update_rate;
            }
            ++this.update_counter;
        }
    }

    @HostListener('touchend', ['$event'])
    onTouchEnd(event: TouchEvent) {
        this.touch_down = false;
    }

    private moveElement(current_y): number {
        let result = current_y - this.element_origin;
        if (result <= this.element.nativeElement.offsetHeight / 2) {
            result = 24;
        }
        if (result >= this.container_height + this.element.nativeElement.offsetHeight / 2) {
            result = this.container_height + this.element.nativeElement.offsetHeight / 2;
        }

        this.renderer.setStyle(this.element.nativeElement, 'top', `${result - this.element.nativeElement.offsetHeight / 2}px`);
        const mapped = this.mapToRange(result,
            this.element.nativeElement.offsetHeight / 2, this.container_height + this.element.nativeElement.offsetHeight / 2,
            0, 100);
        return 100 - mapped;
    }

    private mapToRange(x: number, in_min: number, in_max: number, out_min: number, out_max: number): number {
        return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
    }

}
