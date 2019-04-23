import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TokenService} from '../../services/token.service';
import {UserInterface} from '../../user-interface';
import {BlogService} from '../../services/blog.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {
    public loggedIn: boolean;
    user: UserInterface;
    constructor(private auth: AuthService,
                private router: Router,
                private token: TokenService,
                private blogService: BlogService,
                private activatedRoute: ActivatedRoute) {
        this.user = {
            name: null,
            email: null,
            age: null,
            phone: null,
            address: null,
            image: null
        };
    }

    ngOnInit() {
        this.auth.authStatus.subscribe(value => this.loggedIn = value);
        this.blogService.getUserData().subscribe(user => this.user = user);
    }

    logout(event: MouseEvent) {
        event.preventDefault();
        this.token.remove();
        this.auth.changeAuthStatus(false);
        this.router.navigateByUrl('/login');

    }
}
