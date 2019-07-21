import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {ApiService} from '../api.service';
import {Levels, VolumeResponse} from '../interfaces/volume';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {

    public current_levels: Levels = {master: {pct: 0, muted: false}, left: {pct: 0, muted: false}, right: {pct: 0, muted: false}};

    private connection_interval = null;

    public connected: boolean = false;
    private muted: boolean = false;

    constructor(private api: ApiService) {
    }

    ngOnInit() {
    }

    ngAfterViewInit(): void {
        this.api.getVolume().subscribe(
            (response: VolumeResponse) => {
                console.log(response);
                this.connected = true;
                this.current_levels = response.levels;
                this.muted = response.levels.master.muted;
            },
            (error) => {
                console.log(error);
            }
        );

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
    }

    ngOnDestroy(): void {
        if (this.connection_interval !== 0) {
            clearInterval(this.connection_interval);
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
