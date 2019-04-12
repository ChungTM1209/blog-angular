import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {TokenService} from './token.service';

@Injectable({
    providedIn: 'root'
})
export class AfterLoginService implements CanActivate {

    constructor(private token: TokenService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (!this.token.loggedIn()) {
            alert('You need to login');
        }
        return this.token.loggedIn();
    }
}
