import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ApiService} from '../api.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {

    public current_volume = {master: {pct: 12}, left: {pct: 0}, right: {pct: 0}};

    constructor(private api: ApiService) {
    }

    ngOnInit() {
    }

    ngAfterViewInit(): void {
        this.api.getVolume().subscribe(
            (response) => {
                this.current_volume = response.volumes;
            },
            (error) => {
                console.log(error);
            }
        );
    }


    raiseVolume(): void {
        this.api.raiseVolume(false).subscribe(
            (response) => {
                console.log(response);
                this.current_volume = response.volumes;
            },
            (error) => {
                console.log(error);
            }
        );
    }

    lowerVolume(): void {
        this.api.lowerVolume(false).subscribe(
            (response) => {
                this.current_volume = response.volumes;
            },
            (error) => {
                console.log(error);
            }
        );
    }


}
