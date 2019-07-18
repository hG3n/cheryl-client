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
        url.push(environment.api.base);
        url.push(environment.api.path);
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

    public getVolume(): Observable<any> {
        const url = new Url('standard');
        url.push(environment.api.base);
        url.push(environment.api.path);
        url.push('volume');

        return this.http.get(url.toString());
    }

}
