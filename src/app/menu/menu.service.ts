import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MenuService {
    public onSetMenu: Subject<MenuConfig> = new Subject();

    constructor() {
    }

    public setMenu(menu: MenuConfig) {
        this.onSetMenu.next(menu);
    }
}

export interface MenuItem {
    title: string;
    tag: string;
}

export interface MenuConfig {
    title: string;
    menu: {
        icon: string;
        items: MenuItem[];
    };
}
