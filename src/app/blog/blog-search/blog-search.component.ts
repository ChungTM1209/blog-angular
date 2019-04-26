import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {TokenService} from '../../services/token.service';
import {BlogService} from '../../services/blog.service';
import {BlogInterface} from '../../blog-interface';
import {SearchService} from '../../services/search.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-blog-search',
    templateUrl: './blog-search.component.html',
    styleUrls: ['./blog-search.component.sass']
})
export class BlogSearchComponent implements OnInit {
    blogs: BlogInterface[] = [];
    keyWords: string;
    subs1: Subscription;

    constructor(private router: Router,
                private token: TokenService,
                private blogService: BlogService,
                private activatedRoute: ActivatedRoute,
                private searchService: SearchService) {
    }

    ngOnInit() {

        this.subs1 = this.activatedRoute.params
            .subscribe((params: Params) => {
                const keyWords = params.keyWords ? params.keyWords : '';
                if (keyWords) {
                    this.search(keyWords);
                }
            });
    }

    search(keyWords) {
        this.blogService.search(keyWords).subscribe(data => this.handleResponse(data));

    }

    handleResponse(data: BlogInterface[]) {
        this.blogs = data;
    }

    delete(id: number) {
        if (confirm('Bạn có chắc chắn muốn xóa ?')) {
            return this.blogService.deleteBlog(id).subscribe((res) => {
                alert(res);
                this.showBlogs();
            });
        } else {
            return this.router.navigateByUrl('home/blogs');
        }
    }

    showBlogs() {
        return this.blogService.showBlogs().subscribe(data => {
            this.handleResponse(data);
        });
    }

}
