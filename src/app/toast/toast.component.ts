import {Component, ElementRef, Input, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {ToastMessage, ToastService} from './toast.service';

@Component({
    selector: 'app-toast',
    templateUrl: './toast.component.html',
    styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit, OnDestroy {

    @Input('position') position: string;
    @Input('width') width: string;
    @Input('height') height: string;
    @Input('display-time') display_time: number;

    private show_subscription = null;
    public message: string = '';

    constructor(private element: ElementRef,
                private toastService: ToastService,
                private renderer: Renderer2) {
    }

    ngOnInit() {
        this.renderer.setStyle(this.element.nativeElement, 'position', 'absolute');
        this.renderer.setStyle(this.element.nativeElement, 'width', this.width);
        this.renderer.setStyle(this.element.nativeElement, 'height', this.height);
        this.renderer.setStyle(this.element.nativeElement, 'top', `-${this.height}`);
        this.renderer.setStyle(this.element.nativeElement, 'transition', 'top 300ms');
        this.renderer.setStyle(this.element.nativeElement, 'transition-timing-function', 'ease-in');

        this.renderer.addClass(this.element.nativeElement, 'palette-shade-orange-0');

        this.show_subscription = this.toastService.onShow.subscribe(
            (message: ToastMessage) => {
                this.show();
                this.message = message.message;

                setTimeout(() => this.hide(), this.display_time);
            }
        );

    }

    ngOnDestroy(): void {
        // this.
    }

    private show(): void {
        this.renderer.setStyle(this.element.nativeElement, 'top', 0);
    }

    private hide(): void {
        this.renderer.setStyle(this.element.nativeElement, 'top', `-${this.height}`);
    }

}


