import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApiService} from '../api.service';
import {Equalizer} from '../interfaces/Equalizer';
import {SliderEvent} from '../slider/slider.component';
import {Subscription} from 'rxjs';
import {ui} from '../ui.constants';
import {MenuService} from '../menu/menu.service';
import {InteractionService} from '../interaction.service';
import {Message} from '../lib/Message';

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
                private menu: MenuService,
                private interaction: InteractionService) {
    }

    ngOnInit() {
        const eq_sub = this.api.getEqualizer().subscribe(
            (response: Equalizer[]) => {
                this.equalizers = response;
                this.equalizers_diag = this.equalizers.slice();
                console.log(this.equalizers);
            },
            (error) => {
                console.log(error);
            }
        );
        this.subscriptions.push(eq_sub);

        const menu_sub = this.menu.onOptionSelected.subscribe(
            (tag: string) => {
                console.log('eq menu: ', tag);
            }
        );
        this.subscriptions.push(menu_sub);

        this.menu.setMenu(ui.menus.equalizer);

        const socket_sub = this.interaction.onMessage.subscribe(
            (msg: Message) => {
                if (msg.context === 'equalizer') {
                    const data: Equalizer = msg.data as Equalizer;
                    for (let i = 0; i < this.equalizers.length; ++i) {
                        if (this.equalizers[i].channel.position === data.channel.position) {
                            this.equalizers_diag[i] = data;
                        }
                    }
                    const cpy = this.equalizers_diag.slice();
                    this.equalizers_diag = cpy;
                }
            },
            (err) => {
                console.log(err);
            }
        );
        this.subscriptions.push(socket_sub);

        if (!this.interaction.isOpen()) {
            this.interaction.connect();
        }

    }

    ngOnDestroy(): void {
        for (const sub of this.subscriptions) {
            sub.unsubscribe();
        }
    }

    onSliderChange(event: SliderEvent) {
        this.interaction.send({method: 'set', context: 'equalizer', data: {position: event.id, value: event.value}});
        // this.api.setEqualizer(event.id, event.value).subscribe(
        //     (response: Equalizer) => {
        //         for (let i = 0; i < this.equalizers.length; ++i) {
        //             if (this.equalizers[i].channel.position === response.channel.position) {
        //                 this.equalizers_diag[i] = response;
        //             }
        //         }
        //         const cpy = this.equalizers_diag.slice();
        //         this.equalizers_diag = cpy;
        //     },
        //     (error) => {
        //         console.log(error);
        //     }
        // );
    }

}
