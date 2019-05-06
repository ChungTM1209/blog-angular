import {Component, OnInit} from '@angular/core';
import {BlogInterface} from '../../blog-interface';
import {BlogService} from '../../services/blog.service';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-blog-detail',
    templateUrl: './blog-detail.component.html',
    styleUrls: ['./blog-detail.component.sass']
})
export class BlogDetailComponent implements OnInit {
    blog: BlogInterface;

    constructor(private blogService: BlogService,
                private route: ActivatedRoute) {
        this.blog = {
            title: null,
            content: null,
            description: null,
            id: null,
            image: null,
            tag: null
        };
    }

    ngOnInit() {
        const id = +this.route.snapshot.paramMap.get('id');
        this.showDetail(id);
    }

    showDetail(id: number) {
        return this.blogService.showBlogDetail(id)
            .subscribe(data => {
                    this.blog = data;
                },
                error1 => console.log(error1));
    }
}
