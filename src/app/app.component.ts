import {Component} from '@angular/core';
import {SwUpdate} from '@angular/service-worker';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    constructor(
        private swUpdate: SwUpdate) {
        // this.setupPush();

        // this.setupUpdates();
    }

    setupUpdates() {
        this.swUpdate.available.subscribe(u => {
            // Update wurde entdeckt

            // Update herunterladen
            this.swUpdate.activateUpdate().then(e => {
                // Update wurde heruntergeladen

                const message = 'Application has been updated';
                const action = 'Ok, Reload!';

                location.reload();

                // Benutzer auf Update hinweisen und Seite neu laden
                // this.snackBar.open(message, action).onAction().subscribe(
                //     () => location.reload()
                // );
            });
        });

        // Auf Updates prüfen
        this.swUpdate.checkForUpdate();
    }
}
