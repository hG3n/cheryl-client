import {Component, HostListener, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {SwUpdate} from '@angular/service-worker';
import {ToastService} from './toast/toast.service';
import {environment} from '../environments/environment';
import {StorageService} from './storage.service';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    constructor(private swUpdate: SwUpdate,
                private toast: ToastService,
                private storage: StorageService,
                private renderer: Renderer2) {
        // this.setupPush();

        if (environment.production) {
            this.setupUpdates();
        }
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

    ngOnInit(): void {
        this.renderer.listen('document', 'visibilitychange', (event: any) => {
            if (event.type === 'visibilitychange') {
                switch (document.visibilityState) {
                    case 'visible':
                        break;
                    case 'hidden':
                        break;
                    case 'prerender':
                        break;
                }
            }
        });
    }

    @HostListener('window:unload', ['$event'])
    unloadHandler(event: Event) {
        this.storage.setApplicationStopped();
    }

    @HostListener('window:beforeunload', ['$event'])
    beforeUnloadHander(event) {
        this.storage.setApplicationStopped();
    }

}
