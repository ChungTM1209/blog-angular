import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TokenService} from '../../services/token.service';
import {UserInterface} from '../../user-interface';
import {BlogService} from '../../services/blog.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {BlogInterface} from '../../blog-interface';
import {SearchService} from '../../services/search.service';
import {el} from '@angular/platform-browser/testing/src/browser_util';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {
    public loggedIn: boolean;
    user: UserInterface;
    keyWords: string;
    blogs: BlogInterface[] = [];
currentKeyword;
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
        this.auth.authStatus.subscribe(value => this.loggedIn = value);
        this.blogService.getUserData().subscribe(user => this.user = user);
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
            if (this.keyWords !== this.currentKeyword) {
                this.currentKeyword = this.keyWords;
                this.router.navigate(['/home/search/', this.currentKeyword]);
            } else {
                this.router.navigate(['/home/search/', this.keyWords]);
            }
        } else {
            this.router.navigateByUrl('home/blogs');
        }
    }
}
