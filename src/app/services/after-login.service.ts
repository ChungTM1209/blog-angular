import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {TokenService} from './token.service';
import {AuthService} from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class AfterLoginService implements CanActivate, CanActivateChild {

    constructor(private token: TokenService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (!this.token.loggedIn()) {
            alert('You need to login');
        }
        return this.token.loggedIn();
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot):
        Observable<boolean | UrlTree> | Promise<boolean> | boolean | UrlTree {
        if (!this.token.loggedIn()) {
            alert('You need to login');
        }
        return this.token.loggedIn();
    }

}
