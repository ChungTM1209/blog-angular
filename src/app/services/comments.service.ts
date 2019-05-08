import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CommentsInterface} from '../comments-interface';
import {Subject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CommentsService {
    readonly API_URL = 'http://127.0.0.1:8000/api';
    comment = new Subject();
    cmt = this.comment.asObservable();
    changeComment(value: string) {
        this.comment.next(value);
    }

    constructor(private http: HttpClient) {
    }

    makeReqHeaderJson() {
        const token = localStorage.getItem('token');
        return new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        });
    }

    createComments(data, blogId) {
        return this.http.post<CommentsInterface[]>(
            `${this.API_URL}/create-comments/${blogId}`,
            {data},
            {headers: this.makeReqHeaderJson()});
    }

    getComments(blogId) {
        return this.http.get<CommentsInterface[]>(
            `${this.API_URL}/get-all-comments/${blogId}`,
            {headers: this.makeReqHeaderJson()});
    }
}
