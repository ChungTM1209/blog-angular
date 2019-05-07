import {Component, OnInit} from '@angular/core';
import {BlogService} from '../../services/blog.service';
import {ActivatedRoute, Router} from '@angular/router';
import {BlogInterface} from '../../blog-interface';

@Component({
    selector: 'app-blog-tag',
    templateUrl: './blog-tag.component.html',
    styleUrls: ['./blog-tag.component.sass']
})
export class BlogTagComponent implements OnInit {
    blogs: BlogInterface[] = [];
    currentPage = 1;
    tagName: string;

    constructor(private blogService: BlogService,
                private activatedRoute: ActivatedRoute,
                private router: Router) {
    }

    ngOnInit() {
        this.tagName = this.activatedRoute.snapshot.paramMap.get('tagName');
        this.getBlogDataByTag(this.tagName);
    }

    getBlogDataByTag(tag: string) {
        this.blogService.getBlogDataByTag(tag).subscribe(
            data => this.blogs = data,
            error => console.log(error)
        );
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
    handleResponse(data) {
        this.blogs = data;
    }

}
