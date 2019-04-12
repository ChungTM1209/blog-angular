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

    constructor(private blogService: BlogService,
                private activatedRoute: ActivatedRoute,
                private fb: FormBuilder,
                private router: Router) {
        this.user = {
            name: null,
            email: null,
            age: null,
            phone: null,
            address: null
        };
    }
    ngOnInit() {
        this.profileUpdateForm = this.fb.group({
            email: [''],
            name: [''],
            age: [''],
            address: [''],
            phone: ['']
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
        this.blogService.updateProfile(value)
            .subscribe(
                () => this.router.navigateByUrl('/profile'),
                error => console.log(error));

    }
}
