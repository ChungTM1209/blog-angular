import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CommentsService} from '../services/comments.service';
import {ActivatedRoute, Params} from '@angular/router';
import {BlogService} from '../services/blog.service';
import {CommentsInterface} from '../comments-interface';
import {UserInterface} from '../user-interface';

@Component({
    selector: 'app-comments',
    templateUrl: './comments.component.html',
    styleUrls: ['./comments.component.sass']
})
export class CommentsComponent implements OnInit {
    comments = new FormControl('', Validators.required);
    comment: CommentsInterface[] = [];
    user: UserInterface;
    hidden = true;
    postId: number;
    constructor(private commentsService: CommentsService,
                private activatedRoute: ActivatedRoute,
                private blogService: BlogService) {
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
        this.postId = +this.activatedRoute.snapshot.paramMap.get('id');
        this.getComments();
        this.blogService.getUserData().subscribe(data => this.user = data);
    }

    submit() {
        if (this.comments.valid) {
            const postId = +this.activatedRoute.snapshot.paramMap.get('id');
            this.commentsService.createComments(this.comments.value, postId).subscribe(data => this.comment = data);
            this.comments.setValue('');
        }
    }

    getComments() {
        const postId = this.activatedRoute.snapshot.paramMap.get('id');
        this.commentsService.getComments(postId).subscribe(
            data => this.comment = data
        );
    }

    reply($event: MouseEvent) {
        this.hidden = !this.hidden;
    }
}
