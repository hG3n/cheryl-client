import {Directive, ElementRef, HostListener, OnInit, Renderer2} from '@angular/core';
import {elementAt} from 'rxjs/operators';

@Directive({
    selector: '[slider]'
})
export class MovableDirective implements OnInit {

    private mouse_down: boolean = false;
    private touch_down: boolean = false;

    private element_origin = null;
    private container_height = null;

    constructor(private element: ElementRef,
                private renderer: Renderer2) {
    }

    ngOnInit() {
        this.element_origin = this.element.nativeElement.getBoundingClientRect().y;
        this.container_height = this.element.nativeElement.parentNode.offsetHeight - this.element.nativeElement.offsetHeight;
    }

    @HostListener('mousedown', ['$event'])
    onMouseDown(event: MouseEvent) {
        this.mouse_down = true;
    }

    @HostListener('mousemove', ['$event'])
    onClick(event: MouseEvent) {
        if (this.mouse_down) {
            // console.log(event);
        }
    }

    @HostListener('mouseup', ['$event'])
    onMouseUp(event: MouseEvent) {
        this.mouse_down = false;
    }

    /// TOUCH
    @HostListener('touchstart', ['$event'])
    onTouchStart(event: TouchEvent) {
        // console.log(event);
        this.touch_down = true;
    }

    @HostListener('touchmove', ['$event'])
    onTouchMove(event: TouchEvent) {
        if (this.touch_down) {
            const touch_y = event.touches[0].clientY;

            let result = touch_y - this.element_origin;
            if (result <= this.element.nativeElement.offsetHeight / 2) {
                result = 24;
            }
            if (result >= this.container_height) {
                result = this.container_height -this.element.nativeElement.offsetHeight;
            }
            console.log('element origin', this.element_origin,
                'touch y:', touch_y,
                ' result', result,
                'container height', this.container_height);

            this.renderer.setStyle(this.element.nativeElement, 'top', `${result - this.element.nativeElement.offsetHeight/2}px`);
        }
    }

    @HostListener('touchend', ['$event'])
    onTouchEnd(event: TouchEvent) {
        this.touch_down = false;
    }

}
