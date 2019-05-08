import { Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {TokenService} from './token.service';
import {UserInterface} from '../user-interface';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    onUpdate = new Subject<UserInterface>();
    userData = this.onUpdate.asObservable();
    private loggedIn = new BehaviorSubject<boolean>(this.token.loggedIn());
    authStatus = this.loggedIn.asObservable();
    changeAuthStatus(value: boolean) {
        this.loggedIn.next(value);
    }
    update(user: UserInterface) {
        this.onUpdate.next(user);
    }
    constructor(private token: TokenService) {
    }
}
