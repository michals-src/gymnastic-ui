import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    private readonly apiUrl: string = environment.api_url;

    constructor(private readonly httpClient: HttpClient) {}

    public get<T>(uri: string) {
        return this.httpClient.get<T>(`${this.apiUrl}${this.getUri(uri)}`);
    }

    public post<T>(uri: string, payload: any = {}) {
        return this.httpClient.post<T>(`${this.apiUrl}${this.getUri(uri)}`, payload);
    }

    public put<T>(uri: string, payload: any = {}) {
        return this.httpClient.put<T>(`${this.apiUrl}${this.getUri(uri)}`, payload);
    }

    public delete<T>(uri: string, payload: any = {}) {
        return this.httpClient.delete<T>(`${this.apiUrl}${this.getUri(uri)}`, payload);
    }

    private getUri(uri: string): string {
        if (uri.startsWith('/')) return uri;
        return `/${uri}`;
    }
}
