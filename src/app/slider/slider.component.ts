import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
    selector: 'app-slider',
    templateUrl: './slider.component.html',
    styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit, OnChanges {

    @Input('value') value: number = 0;
    @Input('label') label: string = '';
    @Input('id') id: number;
    @Input('scale-resolution') resolution: number = 10;
    @Input('update-rate') update_rate: number = 10;
    @Output('slider-change') slider_change = new EventEmitter<SliderEvent>();

    // private scale_points: Array<number> = [];

    constructor() {
    }

    ngOnInit(): void {
        // for (let i = 0; i < this.resolution; ++i) {
        //     this.scale_points.push(i);
        // }
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.value = changes.value.currentValue;
    }

    onMovableChange(value: number): void {
        this.value = value;
        const e: SliderEvent = {
            id: this.id,
            value: value
        };
        this.slider_change.emit(e);
    }

    // calcScaleItemPosition(idx): any {
    //     const o = {
    //         top: `calc((100%/${this.resolution} + 1px ) * ${idx} + ${24}px)`
    //     };
    //     return o;
    // }

    parseValue(value: number): number {
        return value | 0;
    }
}

export interface SliderEvent {
    id: number;
    value: number;
}
