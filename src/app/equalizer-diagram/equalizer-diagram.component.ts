import {Component, Input, OnInit} from '@angular/core';
import {Equalizer} from '../interfaces/Equalizer';

@Component({
    selector: 'app-equalizer-diagram',
    templateUrl: './equalizer-diagram.component.html',
    styleUrls: ['./equalizer-diagram.component.scss']
})
export class EqualizerDiagramComponent implements OnInit {

    @Input('equalizer') equalizers: Equalizer[] = [];

    constructor() {
    }

    ngOnInit() {
    }

}
