import {Component, OnInit} from '@angular/core';
import {BlogService} from '../../services/blog.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UserInterface} from '../../user-interface';
import {FormBuilder, FormGroup} from '@angular/forms';
import {HttpHeaders} from '@angular/common/http';

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
                private router: Router) {
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
        this.profileUpdateForm = this.fb.group({
            email: [''],
            name: [''],
            age: [''],
            address: [''],
            phone: [''],
        });
        const token = localStorage.getItem('token');
        this.blogService.getUserData(token).subscribe(
            (user) => {
                this.user = user;
                this.profileUpdateForm.patchValue(user);
            });
    }

    update() {
        const {value} = this.profileUpdateForm;
        console.log(value);
        const userData = new FormData();
        userData.append('email', value.email);
        userData.append('name', value.name);
        userData.append('age', value.age);
        userData.append('address', value.address);
        userData.append('phone', value.phone);
        userData.append('image', this.selectedFile);
        this.blogService.updateProfile(userData)
            .subscribe(
                () => this.router.navigateByUrl('/home/profile'),
                error => console.log(error));

    }

    selectFile(event) {
        this.selectedFile = event.target.files[0];
        return this.selectedFile;
    }
}
