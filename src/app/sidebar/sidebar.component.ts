import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserInterface} from '../user-interface';
import {BlogService} from '../services/blog.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.sass']
})
export class SidebarComponent implements OnInit {
    user: UserInterface;
    opened = true;

    constructor(private blogService: BlogService,
                private activatedRoute: ActivatedRoute) {
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
    }

}
