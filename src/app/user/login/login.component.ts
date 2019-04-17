import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {BlogService} from '../../services/blog.service';
import {TokenService} from '../../services/token.service';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    public error: null;

    constructor(private fb: FormBuilder,
                private blogService: BlogService,
                private token: TokenService,
                private router: Router,
                private auth: AuthService) {
    }

    ngOnInit() {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    login() {
        const {value} = this.loginForm;
        return this.blogService.login(value).subscribe(
            data => this.handleResponse(data),
            error => this.handleError(error)
        );
    }

    handleError(error) {
        this.error = error.error.error;
    }

    handleResponse(data) {
        console.log(data);
        this.token.handle(data.access_token);
        this.auth.changeAuthStatus(true);
        this.router.navigateByUrl('/home/blogs');
    }
}
