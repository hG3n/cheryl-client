import {Component, OnInit} from '@angular/core';
import {ApiService} from '../api.service';
import {Equalizer} from '../interfaces/Equalizer';
import {SliderEvent} from '../slider/slider.component';

@Component({
    selector: 'app-equalizer',
    templateUrl: './equalizer.component.html',
    styleUrls: ['./equalizer.component.scss']
})
export class EqualizerComponent implements OnInit {

    public equalizers: Equalizer[] = [];

    constructor(private api: ApiService) {
    }

    ngOnInit() {
        this.api.getEqualizer().subscribe(
            (response: Equalizer[]) => {
                this.equalizers = response;
            },
            (error) => {
                console.log(error);
            }
        );
    }

    onSliderChange(event: SliderEvent) {
        this.api.setEqualizer(event.id, event.value).subscribe(
            (response) => {
                console.log(response);
            },
            (error) => {
                console.log(error);
            }
        )
    }

}
