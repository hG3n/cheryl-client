import {Injectable} from '@angular/core';
import {app, storageKeys} from './app.constants';

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    constructor() {
    }

    setApplicationRunning(): void {
        localStorage.setItem(storageKeys.state, app.states.running);
    }

    setApplicationStopped(): void {
        localStorage.setItem(storageKeys.state, app.states.stopped);
    }

    applicationStarted(): boolean {
        const value = localStorage.getItem(storageKeys.state);
        return value !== undefined && value === app.states.running;
    }
}
