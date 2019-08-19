import {Component} from '@angular/core';
import {SwUpdate} from '@angular/service-worker';
import {ToastService} from './toast/toast.service';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    constructor(private swUpdate: SwUpdate,
                private toast: ToastService) {
        // this.setupPush();

        // this.setupUpdates();
    }

    setupUpdates() {
        this.swUpdate.available.subscribe(u => {
            this.swUpdate.activateUpdate().then(e => {
                this.toast.showToast('Application has been updated, Reloading in 5 seconds.');
                setTimeout(() => {
                    location.reload();
                }, 5000);

            });
        });

        // Auf Updates prüfen
        this.swUpdate.checkForUpdate();
    }
}
