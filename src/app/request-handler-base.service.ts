import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class RequestHandlerBaseService {

    constructor(public  http: HttpClient) {
        this.http = http;
    }

    /**
     * Sends get request to given url
     * @param url
     * @param params
     * @param headers
     */
    public get(url: string, params: HttpParams, headers: HttpHeaders): Observable<any> {
        return this.http.get(url, {headers, params});
    }

    /**
     * Sends a PUT request with specified header.
     * @param url
     * @param params
     * @param headers
     */
    public put(url: string, params: HttpParams, headers: HttpHeaders): Observable<any> {
        return this.http.put(url, null, {headers, params});
    }

    /**
     * Sends post request to given url with specified data
     * @param {string} url
     * @param body
     * @return {Observable<any>}
     */
    public post(url: string, body: any): Observable<any> {
        return this.http.post(url, body);
    }
}
