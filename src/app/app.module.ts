import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {HttpClientModule} from '@angular/common/http';
import {SliderComponent} from './slider/slider.component';
import {MovableDirective} from './movable.directive';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {EqualizerComponent} from './equalizer/equalizer.component';
import {VolumeLevelComponent} from './volume-level/volume-level.component';
import {EqualizerDiagramComponent} from './equalizer-diagram/equalizer-diagram.component';
import {HighchartsChartModule} from 'highcharts-angular';
import {MenuComponent} from './menu/menu.component';
import {ToastComponent} from './toast/toast.component';
import {ToastService} from './toast/toast.service';
import {DropdownComponent} from './dropdown/dropdown.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SocketService} from './socket.service';
import {StorageService} from './storage.service';

@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        SliderComponent,
        MovableDirective,
        EqualizerComponent,
        VolumeLevelComponent,
        EqualizerDiagramComponent,
        MenuComponent,
        ToastComponent,
        DropdownComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        FlexLayoutModule,
        HttpClientModule,
        ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
        HighchartsChartModule
    ],
    providers: [ToastService, SocketService, StorageService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
