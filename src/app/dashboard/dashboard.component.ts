import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {ApiService} from '../api.service';
import {Levels, VolumeResponse} from '../interfaces/volume';
import {Subscription} from 'rxjs';
import {ToastService} from '../toast/toast.service';
import {MenuConfig, MenuService} from '../menu/menu.service';
import {ui} from '../ui.constants';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {

    public current_levels: Levels = {master: {pct: 0, muted: false}, left: {pct: 0, muted: false}, right: {pct: 0, muted: false}};

    private connection_interval = null;

    public connected: boolean = false;
    public muted: boolean = false;

    private subscriptions: Subscription[] = [];

    constructor(private api: ApiService,
                private toast: ToastService,
                private menu: MenuService) {
    }

    ngOnInit() {
    }

    ngAfterViewInit(): void {
        const volume_sub = this.api.getVolume().subscribe(
            (response: VolumeResponse) => {
                console.log(response);
                this.connected = true;
                this.current_levels = response.levels;
                this.muted = response.levels.master.muted;
                this.toast.showToast('Connected to Server');
            },
            (error) => {
                console.log(error);
            }
        );
        this.subscriptions.push(volume_sub);


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
            console.log('Not connected to the Server!');
            return;
        }
        this.api.setVolume(parseInt(value, 10)).subscribe(
            (response: VolumeResponse) => {
                this.current_levels = response.levels;
                this.muted = response.levels.master.muted;
            },
            (error) => {
                console.log(error);
            }
        );
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
}
