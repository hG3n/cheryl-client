import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {MenuConfig} from '../lib/Menu';

@Injectable({
    providedIn: 'root'
})
export class MenuService {
    public onSetMenu: Subject<MenuConfig> = new Subject();
    public onOptionSelected: Subject<string> = new Subject();

    constructor() {
    }

    public setMenu(menu: MenuConfig) {
        this.onSetMenu.next(menu);
    }
}


