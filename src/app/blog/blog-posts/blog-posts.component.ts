import {Component, OnInit} from '@angular/core';
import {BlogService} from '../../services/blog.service';
import {BlogInterface} from '../../blog-interface';
import {Router} from '@angular/router';

@Component({
    selector: 'app-blog-posts',
    templateUrl: './blog-posts.component.html',
    styleUrls: ['./blog-posts.component.sass']
})
export class BlogPostsComponent implements OnInit {
    blogs: BlogInterface[] = [];
    blog: BlogInterface;

    constructor(private blogService: BlogService,
                private router: Router) {
    }

    ngOnInit() {
        this.showBlogs();
    }

    showBlogs() {
        return this.blogService.showBlogs().subscribe(data => this.handleResponse(data));
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
