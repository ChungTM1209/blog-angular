import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TokenService} from '../../services/token.service';
import {BlogService} from '../../services/blog.service';
import {BlogInterface} from '../../blog-interface';

@Component({
    selector: 'app-blog-search',
    templateUrl: './blog-search.component.html',
    styleUrls: ['./blog-search.component.sass']
})
export class BlogSearchComponent implements OnInit {
    blogs: BlogInterface[] = [];
    keyWords = this.activatedRoute.snapshot.paramMap.get('keyWords');

    constructor(private router: Router,
                private token: TokenService,
                private blogService: BlogService,
                private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
    }
}
