import {AfterViewInit, Component, ElementRef, Input, OnChanges, Renderer2, SimpleChanges, ViewChild} from '@angular/core';
import {Util} from '../lib/Util';

@Component({
    selector: 'app-volume-level',
    templateUrl: './volume-level.component.html',
    styleUrls: ['./volume-level.component.scss']
})
export class VolumeLevelComponent implements AfterViewInit, OnChanges {

    @Input('level') level: number;
    @ViewChild('indicator', {static: true}) private indicator: ElementRef;

    private container_width: number = null;

    constructor(private renderer: Renderer2) {
    }

    ngAfterViewInit(): void {
        this.container_width = this.indicator.nativeElement.parentNode.offsetWidth;
        this.updateComponent();
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.updateComponent();
    }

    updateComponent() {
        const value = Util.mapToRange(this.level, 0, 100, 0, this.container_width);
        this.renderer.setStyle(this.indicator.nativeElement, 'padding-left', `${value}px`);
    }

    public getInfoColorClass(value: number) {
        if (value <= 60) {
            return 'normal';
        } else if (value > 60 && value <= 80) {
            return 'medium';
        }
        return 'danger';
    }

}
