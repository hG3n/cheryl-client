import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ToastService {

    public onShow: Subject<ToastMessage> = new Subject();

    constructor() {
    }

    public showToast(message: string) {
        this.onShow.next({message, icon: null});
    }
}

export interface ToastMessage {
    message: string;
    icon: string;
}
