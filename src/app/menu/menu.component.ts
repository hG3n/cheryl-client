import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {MenuConfig} from '../lib/Menu';
import {MenuService} from './menu.service';

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

    optionSelected(tag: string): void {
        this.menu.onOptionSelected.next(tag);
    }

}
