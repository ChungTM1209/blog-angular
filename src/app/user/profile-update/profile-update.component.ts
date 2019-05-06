import {Component, OnInit} from '@angular/core';
import {BlogService} from '../../services/blog.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UserInterface} from '../../user-interface';
import {FormBuilder, FormGroup} from '@angular/forms';
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
            name: [''],
            dob: [''],
            address: [''],
            phone: [''],
        });
        this.blogService.getUserData().subscribe(
            (user) => {
                this.user = user;
                this.profileUpdateForm.patchValue(user);
            });
    }

    update() {
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
                    () => this.handleResponse(),
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
                    () => this.handleResponse(),
                    error => console.log(error));
            this.auth.update(this.user);
        }
    }

    selectFile(event) {
        this.selectedFile = event.target.files[0];
        return this.selectedFile;
    }
    handleResponse() {
        this.auth.update(this.user);
        this.router.navigateByUrl('/home/profile');
    }
}
