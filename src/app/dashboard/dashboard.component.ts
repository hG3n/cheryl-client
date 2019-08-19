import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {ApiService} from '../api.service';
import {Levels, VolumeResponse} from '../interfaces/Volume';
import {Subscription} from 'rxjs';
import {ToastService} from '../toast/toast.service';
import {ui} from '../ui.constants';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MenuService} from '../menu/menu.service';
import {InteractionService} from '../interaction.service';
import {Message} from '../lib/Message';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [
        trigger('openClose', [
            // ...
            state('open', style({
                // height: '100%',
            })),
            state('closed', style({
                // height: '0px',
            })),
            transition('open => closed', [
                animate('1s', style({
                    height: '0px',
                }))
            ]),
            transition('closed => open', [
                animate('10s', style({
                    height: '100px',
                }))
            ]),
        ]),
    ],
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {

    public current_levels: Levels = {master: {pct: 0, muted: false}, left: {pct: 0, muted: false}, right: {pct: 0, muted: false}};

    private connection_interval = null;

    public connected: boolean = false;
    public muted: boolean = false;

    private subscriptions: Subscription[] = [];

    public is_active = true;

    /**
     * c'tor
     * @param api
     * @param toast
     * @param menu
     * @param interaction
     */
    constructor(private api: ApiService,
                private toast: ToastService,
                private menu: MenuService,
                private interaction: InteractionService) {
    }

    /**
     * On init
     */
    ngOnInit() {
        const socket_sub = this.interaction.onMessage.subscribe(
            (msg: Message) => {
                if (msg.context === 'volume') {
                    this.current_levels = msg.data as Levels;
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

    /**
     * After view init
     */
    ngAfterViewInit(): void {
        const volume_sub = this.api.getVolume().subscribe(
            (response: Levels) => {
                this.connected = true;
                this.current_levels = response;
                this.muted = response.master.muted;
                this.toast.showToast('Connected to Server');
            },
            (error) => {
                console.log(error);
            }
        );
        this.subscriptions.push(volume_sub);

        const menu_sub = this.menu.onOptionSelected.subscribe(
            (item: string) => {
                console.log('dash menu:', item);
            }
        );
        this.subscriptions.push(menu_sub);


        setInterval(() => {
            this.api.getInfo().subscribe(
                (response) => {
                    this.connected = true;
                },
                (error) => {
                    this.connected = true;
                }
            );
        }, 10000);

        this.menu.setMenu(ui.menus.dashboard);
    }

    /**
     * OnDestroy
     */
    ngOnDestroy(): void {
        if (this.connection_interval !== 0) {
            clearInterval(this.connection_interval);
        }

        for (const element of this.subscriptions) {
            element.unsubscribe();
        }
    }


    setVolume(value): void {
        if (!this.connected) {
            this.toast.showToast('No Interaction possible, not connected to the server');
            return;
        }
        this.interaction.send({method: 'set', context: 'volume', data: {volume: value}});
    }


    raiseVolume(): void {
        if (!this.connected) {
            console.log('Not connected to the Server!');
            return;
        }
        this.api.raiseVolume(false).subscribe(
            (response: VolumeResponse) => {
                this.current_levels = response.levels;
                this.muted = response.levels.master.muted;
            },
            (error) => {
                console.log(error);
            }
        );
    }

    lowerVolume(): void {
        if (!this.connected) {
            console.log('Not connected to the Server!');
            return;
        }
        this.api.lowerVolume(false).subscribe(
            (response: VolumeResponse) => {
                this.current_levels = response.levels;
                this.muted = response.levels.master.muted;
            },
            (error) => {
                console.log(error);
            }
        );
    }

    mute(): void {
        if (!this.connected) {
            console.log('Not connected to the Server!');
            return;
        }
        this.api.muteSystem().subscribe(
            (response) => {
                this.current_levels = response.levels;
                this.muted = response.levels.master.muted;
            },
            (error) => {
                console.log(error);
            }
        );
    }

    toggle(): void {
        this.is_active = !this.is_active;
    }
}
