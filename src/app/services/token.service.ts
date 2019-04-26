import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TokenService {
    readonly API_URL = 'http://127.0.0.1:8000/api/';
    private iss = {
        login: this.API_URL + 'login',
        register: this.API_URL + 'register',
    };

    constructor() {
    }

    handle(token) {
        this.set(token);
    }

    set(token) {
        return localStorage.setItem('token', token);
    }

    get() {
        return localStorage.getItem('token');
    }

    remove() {
        return localStorage.removeItem('token');
    }

    isValid() {
        const token = this.get();
        if (token) {
            const payload = this.payload(token);
            if (payload) {
                return Object.values(this.iss).indexOf(payload.iss) > -1 ? true : false;
            }
        }
    }

    payload(token) {
        const payload = token.split('.')[1];
        return this.decode(payload);
    }

    decode(payload) {
        return JSON.parse(atob(payload));
    }

    loggedIn() {
        return this.isValid();
    }
}
