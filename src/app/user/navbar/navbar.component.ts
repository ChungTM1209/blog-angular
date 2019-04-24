import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TokenService} from '../../services/token.service';
import {UserInterface} from '../../user-interface';
import {BlogService} from '../../services/blog.service';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {
    public loggedIn: boolean;
    user: UserInterface;
    keyWords: string;

    @Output() onLogout = new EventEmitter();

    constructor(private auth: AuthService,
                private router: Router,
                private token: TokenService,
                private blogService: BlogService,
                private activatedRoute: ActivatedRoute,
                private fb: FormBuilder) {
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
        this.onLogout.emit(true);

    }

    search() {
        this.blogService.search(this.keyWords).subscribe(data => console.log(data));
    }

    getKeyWords($event) {
        this.keyWords = $event.target.value;
    }
}
