import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApiService} from '../api.service';
import {Equalizer} from '../interfaces/Equalizer';
import {SliderEvent} from '../slider/slider.component';
import {Subscription} from 'rxjs';
import {ui} from '../ui.constants';
import {MenuService} from '../menu/menu.service';

@Component({
    selector: 'app-equalizer',
    templateUrl: './equalizer.component.html',
    styleUrls: ['./equalizer.component.scss']
})
export class EqualizerComponent implements OnInit, OnDestroy {

    public equalizers: Equalizer[] = [];
    public equalizers_diag: Equalizer[] = [];

    private subscriptions: Subscription[] = [];

    constructor(private api: ApiService,
                private menu: MenuService) {
    }

    ngOnInit() {
        const eq_sub = this.api.getEqualizer().subscribe(
            (response: Equalizer[]) => {
                this.equalizers = response;
                this.equalizers_diag = this.equalizers.slice();
            },
            (error) => {
                console.log(error);
            }
        );
        this.subscriptions.push(eq_sub);

        this.menu.setMenu(ui.menus.equalizer);
    }

    ngOnDestroy(): void {
        for (const sub of this.subscriptions) {
            sub.unsubscribe();
        }
    }

    onSliderChange(event: SliderEvent) {
        this.api.setEqualizer(event.id, event.value).subscribe(
            (response: Equalizer) => {
                for (let i = 0; i < this.equalizers.length; ++i) {
                    if (this.equalizers[i].channel.position === response.channel.position) {
                        this.equalizers_diag[i] = response;
                    }
                }
                const cpy = this.equalizers_diag.slice();
                this.equalizers_diag = cpy;
            },
            (error) => {
                console.log(error);
            }
        );
    }

}
