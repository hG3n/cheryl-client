import {Component, OnInit} from '@angular/core';
import {ApiService} from '../api.service';
import {Subject} from 'rxjs';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    private onGetVolume: Subject<boolean> = new Subject<boolean>();
    private current_volume = {master: {pct: 0}, left: {pct: 0}, right: {pct: 0}};

    constructor(private api: ApiService) {
    }

    ngOnInit() {
        this.onGetVolume.subscribe(
            () => {
                this.api.getVolume().subscribe(
                    (response) => {
                        if (response.success) {
                            this.current_volume = response.message.volumes;
                        }
                        console.log(this.current_volume);
                    },
                    (error) => {
                        console.log(error);
                    }
                );
            }
        );
    }

    raiseVolume(): void {
        this.api.raiseVolume(false).subscribe(
            (response) => {
                this.onGetVolume.next(true);
            },
            (error) => {
                console.log(error);
            }
        );
    }

    lowerVolume(): void {
        this.api.lowerVolume(false).subscribe(
            (response) => {
                this.onGetVolume.next(true);
            },
            (error) => {
                console.log(error);
            }
        );
    }


}
