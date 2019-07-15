import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Url} from './lib/Url';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    private base_url = '192.168.178.40/api';

    constructor(private http: HttpClient) {
    }

    public raiseVolume(precision: false): Observable<any> {
        const url = new Url('standard');
        url.push(this.base_url);
        url.push('volume');
        url.push('raise');

        const body = {
            precision: precision
        };

        return this.http.post(url.toString(), body);
    }

    public lowerVolume(precision: false): Observable<any> {
        const url = new Url('standard');
        url.push(this.base_url);
        url.push('volume');
        url.push('lower');

        const body = {
            precision: precision
        };

        return this.http.post(url.toString(), body);
    }

    public getVolume(): Observable<any> {
        const url = new Url('standard');
        url.push(this.base_url);
        url.push('volume');

        return this.http.get(url.toString());
    }

}
