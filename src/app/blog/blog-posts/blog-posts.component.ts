import {Component, Input, OnInit} from '@angular/core';
import {BlogService} from '../../services/blog.service';
import {BlogInterface} from '../../blog-interface';
import {Router} from '@angular/router';
import {SearchService} from '../../services/search.service';
import {el} from '@angular/platform-browser/testing/src/browser_util';

@Component({
    selector: 'app-blog-posts',
    templateUrl: './blog-posts.component.html',
    styleUrls: ['./blog-posts.component.sass']
})
export class BlogPostsComponent implements OnInit {
    @Input() keyWords: string;
    blogs: BlogInterface[] = [];
    blog: BlogInterface;

    constructor(private blogService: BlogService,
                private router: Router,
                private searchService: SearchService) {
    }

    ngOnInit() {
            this.showBlogs();
    }

    showBlogs() {
        return this.blogService.showBlogs().subscribe(data => {
            this.handleResponse(data);
        });
    }

    handleResponse(data) {
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


}
