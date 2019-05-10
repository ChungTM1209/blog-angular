import {Component, OnInit} from '@angular/core';
import {BlogInterface} from '../../blog-interface';
import {BlogService} from '../../services/blog.service';
import {ActivatedRoute} from '@angular/router';
import {EmbedVideoService} from 'ngx-embed-video/dist';

@Component({
    selector: 'app-blog-detail',
    templateUrl: './blog-detail.component.html',
    styleUrls: ['./blog-detail.component.sass']
})
export class BlogDetailComponent implements OnInit {
    blog: BlogInterface;
    tags: string[] = [];
    status = false;
    iframeHtml: any;


    constructor(private blogService: BlogService,
                private route: ActivatedRoute,
                private embedService: EmbedVideoService) {
        this.blog = {
            title: null,
            content: null,
            description: null,
            id: null,
            image: null,
            tag: null,
            video: null
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
                    this.changeToArray(data.tag);
                    if (this.blog.video){
                        this.iframeHtml = this.embedService.embed(this.blog.video);
                    }
                },
                error1 => console.log(error1));
    }
    changeToArray(data) {
        for (let i = 0; i < data.length; i++) {
            this.tags[i] = data[i].name;
        }
        return this.tags;
    }

    changeStatus($event: MouseEvent) {
        this.status = !this.status;
    }


}
