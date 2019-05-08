import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TokenService} from '../../services/token.service';
import {UserInterface} from '../../user-interface';
import {BlogService} from '../../services/blog.service';
import {FormBuilder} from '@angular/forms';
import {BlogInterface} from '../../blog-interface';
import {SearchService} from '../../services/search.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {
    user: UserInterface ;
    keyWords: string;
    blogs: BlogInterface[] = [];
    public loggedIn: boolean;

    constructor(private auth: AuthService,
                private router: Router,
                private token: TokenService,
                private blogService: BlogService,
                private activatedRoute: ActivatedRoute,
                private fb: FormBuilder,
                private searchService: SearchService) {
        this.user = {
            name: null,
            email: null,
            dob: null,
            phone: null,
            address: null,
            image: null
        };

    }

    ngOnInit() {
        this.blogService.getUserData().subscribe(user => this.user = user);
        this.auth.userData.subscribe(user => this.user = user);
        this.auth.authStatus.subscribe(value => this.loggedIn = value);

    }

    logout(event: MouseEvent) {
        event.preventDefault();
        this.token.remove();
        this.auth.changeAuthStatus(false);
        this.router.navigateByUrl('/login');
    }


    getKeyWords($event) {
        this.keyWords = $event.target.value.trim();
    }

    onClick() {
        this.searchService.changeKeyword(this.keyWords);
        if (this.keyWords) {
            this.router.navigate(['/home/search/', this.keyWords]);

        } else {
            this.router.navigateByUrl('home/blogs');
        }
    }
}
