import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ReplyInterface} from '../reply-interface';

@Injectable({
    providedIn: 'root'
})
export class ReplyService {
    readonly API_URL = 'http://127.0.0.1:8000/api';

    constructor(private http: HttpClient) {
    }

    createReply(postId, cmtId, body) {
        return this.http.post<ReplyInterface[]>(`${this.API_URL}/reply/${cmtId}`,
            {postId, body},
            {headers: this.makeReqHeaderJson()});
    }
    getAllReplies(postId, cmtId) {
        return this.http.post<ReplyInterface[]>(`${this.API_URL}/get-all-replies/${cmtId}`,
            {postId},
            {headers: this.makeReqHeaderJson()});
    }

    makeReqHeaderJson() {
        const token = localStorage.getItem('token');
        return new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        });
    }
}
