import {Component, OnDestroy, OnInit} from '@angular/core';
import {MenuConfig, MenuService} from './menu.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {

    public title: string;
    public config: MenuConfig;

    private get_menu_subscription: Subscription;

    constructor(private menu: MenuService) {
    }

    ngOnInit() {
        this.get_menu_subscription = this.menu.onSetMenu.subscribe(
            (config: MenuConfig) => {
                this.title = config.title;
                this.config = config;
            }
        );
    }

    ngOnDestroy(): void {
        this.get_menu_subscription.unsubscribe();
    }

}
