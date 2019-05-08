import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {BlogService} from '../../services/blog.service';
import {TokenService} from '../../services/token.service';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {ErrorStateMatcher} from '@angular/material';

export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.sass']
})

export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    public error: null;
    matcher = new MyErrorStateMatcher();
    options: FormGroup;

    constructor(private fb: FormBuilder,
                private blogService: BlogService,
                private token: TokenService,
                private router: Router,
                private auth: AuthService) {
        this.options = fb.group({
            hideRequired: false,
            floatLabel: 'auto',
        });
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
        this.token.handle(data.access_token);
        this.auth.changeAuthStatus(true);
        this.router.navigateByUrl('/home/blogs');
    }
}
