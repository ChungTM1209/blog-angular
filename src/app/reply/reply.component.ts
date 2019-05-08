import {Component, Input, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {ReplyService} from '../services/reply.service';
import {ReplyInterface} from '../reply-interface';
import {UserInterface} from '../user-interface';
import {BlogService} from '../services/blog.service';

@Component({
    selector: 'app-reply',
    templateUrl: './reply.component.html',
    styleUrls: ['./reply.component.sass']
})
export class ReplyComponent implements OnInit {
    @Input() postId: number;
    @Input() commentId: number;
    body = new FormControl('', Validators.required);
    replies: ReplyInterface[];
    user: UserInterface;
    hidden = false;

    constructor(private replyService: ReplyService,
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
        this.blogService.getUserData().subscribe(data => this.user = data);

        this.getAllReplies();
    }

    reply() {
        if (this.body.valid) {
            this.hidden = !this.hidden;
            this.replyService.createReply(this.postId, this.commentId, this.body.value).subscribe(
                data => this.replies = data
            );
            this.body.setValue('');
        }

    }

    getAllReplies() {
        return this.replyService.getAllReplies(this.postId, this.commentId).subscribe(
            data => this.replies = data
        );
    }
}
