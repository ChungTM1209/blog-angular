import {Component, OnInit} from '@angular/core';
import {BlogService} from '../../services/blog.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UserInterface} from '../../user-interface';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';

@Component({
    selector: 'app-profile-update',
    templateUrl: './profile-update.component.html',
    styleUrls: ['./profile-update.component.sass']
})
export class ProfileUpdateComponent implements OnInit {
    user: UserInterface;
    profileUpdateForm: FormGroup;
    selectedFile: File = null;

    constructor(private blogService: BlogService,
                private activatedRoute: ActivatedRoute,
                private fb: FormBuilder,
                private router: Router,
                private auth: AuthService) {
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
        this.profileUpdateForm = this.fb.group({
            email: [''],
            name: ['', Validators.required],
            dob: ['', Validators.required],
            address: ['', Validators.required],
            phone: ['', Validators.required],
        });
        this.blogService.getUserData().subscribe(
            (user) => {
                this.user = user;
                this.profileUpdateForm.patchValue(user);
            });
    }

    update() {
        if (this.profileUpdateForm.valid) {
            const {value} = this.profileUpdateForm;
            if (this.selectedFile === null) {
                const userData = new FormData();
                userData.append('email', value.email);
                userData.append('name', value.name);
                userData.append('dob', value.dob);
                userData.append('address', value.address);
                userData.append('phone', value.phone);
                this.blogService.updateProfile(userData)
                    .subscribe(
                        (data) => this.handleResponse(data),
                        error => console.log(error));
            } else {
                const userData = new FormData();
                userData.append('email', value.email);
                userData.append('name', value.name);
                userData.append('dob', value.dob);
                userData.append('address', value.address);
                userData.append('phone', value.phone);
                userData.append('image', this.selectedFile);
                this.blogService.updateProfile(userData)
                    .subscribe(
                        (data) => this.handleResponse(data),
                        error => console.log(error));
            }
        }

    }

    selectFile(event) {
        this.selectedFile = event.target.files[0];
        return this.selectedFile;
    }
    handleResponse(data) {
        this.user = data;
        this.auth.update(this.user);
        this.router.navigateByUrl('/home/profile');
    }
}
