import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Url} from './lib/Url';
import {environment} from '../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(private http: HttpClient) {
    }

    public raiseVolume(precision: false): Observable<any> {
        const url = new Url('standard');
        url.push(environment.api.base.toString());
        url.push(environment.api.path.toString());
        url.push('volume');
        url.push('raise');

        const body = {
            precision: precision
        };

        return this.http.post(url.toString(), body);
    }

    public lowerVolume(precision: false): Observable<any> {
        const url = new Url('standard');
        url.push(environment.api.base);
        url.push(environment.api.path);
        url.push('volume');
        url.push('lower');

        const body = {
            precision: precision
        };

        return this.http.post(url.toString(), body);
    }

    public setVolume(value: number): Observable<any> {
        const url = new Url('standard');
        url.push(environment.api.base);
        url.push(environment.api.path);
        url.push('volume');
        url.push('discrete');
        url.push(value.toString());

        return this.http.put(url.toString(), null);
    }

    public getVolume(): Observable<any> {
        const url = new Url('standard');
        url.push(environment.api.base);
        url.push(environment.api.path);
        url.push('volume');

        return this.http.get(url.toString());
    }

    public muteSystem(): Observable<any> {
        const url = new Url('standard');
        url.push(environment.api.base);
        url.push(environment.api.path);
        url.push('volume');
        url.push('mute');

        return this.http.put(url.toString(), null);
    }

    public getInfo(): Observable<any> {
        const url = new Url('standard');
        url.push(environment.api.base);
        url.push(environment.api.path);
        url.push('info');

        return this.http.get(url.toString());
    }

    public getEqualizer(): Observable<any> {
        const url = new Url('standard');
        url.push(environment.api.base);
        url.push(environment.api.path);
        url.push('equalizer');

        return this.http.get(url.toString());
    }

    public setEqualizer(id: number, value: number): Observable<any> {
        const url = new Url('standard');
        url.push(environment.api.base);
        url.push(environment.api.path);
        url.push('equalizer');
        url.push(id.toString());
        url.push(value.toString());

        return this.http.put(url.toString(), null);
    }

}
