import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {ApiService} from '../api.service';
import {Levels} from '../interfaces/Volume';
import {Subscription} from 'rxjs';
import {ToastService} from '../toast/toast.service';
import {ui} from '../ui.constants';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MenuService} from '../menu/menu.service';
import {SocketService} from '../socket.service';
import {Message} from '../lib/Message';
import {api} from '../api.constants';
import {StorageService} from '../storage.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [
        trigger('openClose', [
            // ...
            state('open', style({
                height: '100%',
            })),
            state('closed', style({
                height: '0px',
            })),
            transition('open => closed', [
                animate('10s', style({
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

    public connected = false;
    public muted = false;

    private subscriptions: Subscription[] = [];

    public is_active = true;

    /**
     * c'tor
     * @param api ApiService
     * @param toast ToastService
     * @param menu MenuService
     * @param socket SocketService
     */
    constructor(private api: ApiService,
                private toast: ToastService,
                private menu: MenuService,
                private socket: SocketService,
                private storage: StorageService) {
    }

    /**
     * On init
     */
    ngOnInit() {
        // initialize socket
        const socket_sub = this.socket.onMessage.subscribe(
            (msg: Message) => {
                if (msg.context === 'volume') {
                    this.current_levels = msg.data as Levels;
                    this.muted = this.current_levels.master.muted;
                }
            },
            (err) => {
                console.log(err);
            }
        );
        this.subscriptions.push(socket_sub);

        if (!this.socket.isOpen()) {
            this.socket.connect();
        }
    }

    /**
     * After view init
     */
    ngAfterViewInit(): void {
        // get initial volume
        const volume_sub = this.api.getVolume().subscribe(
            (response: Levels) => {
                this.connected = true;
                this.current_levels = response;
                this.muted = response.master.muted;
                if (!this.storage.applicationStarted()) {
                    this.toast.showToast('Connected to Server');
                    this.storage.setApplicationRunning();
                }
            },
            (error) => {
                console.log(error);
            }
        );
        this.subscriptions.push(volume_sub);

        // connection interval
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

        this.initMenu();
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

    initMenu(): void {
        // init menu
        const menu_sub = this.menu.onOptionSelected.subscribe(
            (item: string) => {
                console.log('dash menu:', item);
            }
        );
        this.subscriptions.push(menu_sub);

        this.menu.setMenu(ui.menus.dashboard);

        this.menu.onOptionSelected.subscribe(
            (tag: string) => {
                switch (tag) {
                    case 'settings':
                        this.toast.showToast('Not implemented yet');
                        break;
                    case 'status':
                        this.menuStatusSelected();
                        break;
                    case 'restart':
                        this.menuRestartSelected();
                        break;

                }
            }
        );
    }

    private menuRestartSelected(): void {
        this.api.restartRaspotifyServer().subscribe(
            (response) => {
                console.log(response);
            }
        );
    }

    private menuStatusSelected(): void {
        this.api.getRaspotifyStatus().subscribe(
            (response) => {
                console.log(response);
            }
        );
    }

    setVolume(value): void {
        if (!this.connected) {
            this.toast.showToast('No Interaction possible, not connected to the server');
            return;
        }
        this.socket.send({method: 'set', context: 'volume', data: {volume: value}});
    }


    raiseVolume(): void {
        if (!this.connected) {
            this.toast.showToast('Not connected to the Server!');
            return;
        }
        this.api.raiseVolume(false).subscribe(
            (response: Levels) => {
                this.current_levels = response;
                this.muted = response.master.muted;
            },
            (error) => {
                console.log(error);
            }
        );
    }

    lowerVolume(): void {
        if (!this.connected) {
            this.toast.showToast('Not connected to the Server!');
            return;
        }
        this.api.lowerVolume(false).subscribe(
            (response: Levels) => {
                this.current_levels = response;
                this.muted = response.master.muted;
            },
            (error) => {
                console.log(error);
            }
        );
    }

    mute(): void {
        if (!this.connected) {
            this.toast.showToast('Not connected to the Server!');
            return;
        }
        this.api.muteSystem().subscribe(
            (response: Levels) => {
                this.current_levels = response;
                this.muted = response.master.muted;
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
