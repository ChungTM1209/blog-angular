import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ChangePasswordService} from '../../services/change-password.service';
import {TokenService} from '../../services/token.service';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {ErrorInterface} from '../../error-interface';

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.sass']
})
export class ChangePasswordComponent implements OnInit {
    changePasswordForm: FormGroup;
    error: ErrorInterface;

    constructor(private fb: FormBuilder,
                private changePasswordService: ChangePasswordService,
                private token: TokenService,
                private auth: AuthService,
                private router: Router) {
    }

    ngOnInit() {
        this.changePasswordForm = this.fb.group({
            oldPassword: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]],
            password_confirmation: ['', Validators.required]
        });
    }

    change() {
        const {value} = this.changePasswordForm;
        if (this.changePasswordForm.valid) {
            return this.changePasswordService.changePassword(value).subscribe(
                (data) => {
                    this.handleRespone(data);
                },
                error => console.log(this.handleError(error))
            );
        }

    }
    logout() {
        this.token.remove();
        this.auth.changeAuthStatus(false);
        this.router.navigateByUrl('/login');
    }
    handleError(error) {
        this.error = error.error.errors;
    }
    handleRespone(data) {
        if (data === 'Change password successfully') {
            alert(data);
            this.logout();
        } else {
            alert(data);
        }
    }
}
