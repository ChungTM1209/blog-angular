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

    constructor(private blogService: BlogService,
                private activatedRoute: ActivatedRoute) {
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
        const token = localStorage.getItem('token');
        this.blogService.getUserData(token).subscribe(user => this.user = user);
    }

}
