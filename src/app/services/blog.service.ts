import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserInterface} from '../user-interface';
import {BlogInterface} from '../blog-interface';

@Injectable({
    providedIn: 'root'
})
export class BlogService {
    readonly API_URL = 'http://localhost:8000/api';

    constructor(private http: HttpClient) {
    }

    login(data) {
        return this.http.post(`${this.API_URL}/login`, data);
    }

    register(data) {
        return this.http.post(`${this.API_URL}/register`, data);
    }


    getUserData(token) {
        const reqHeader = this.makeReqHeader(token);
        return this.http.get<UserInterface>(`${this.API_URL}/me`, {headers: reqHeader});
    }

    updateProfile(data) {
        const token = localStorage.getItem('token');
        const reqHeader = new HttpHeaders({
            enctype: 'multipart/form-data',
            Authorization: 'Bearer ' + token
        });

        return this.http.post(`${this.API_URL}/update`, data, {headers: reqHeader});
    }

    makeReqHeader(token) {
        const reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        });
        return reqHeader;
    }

    createBlog(data) {
        const token = localStorage.getItem('token');
        const reqHeader = new HttpHeaders({
            enctype: 'multipart/form-data',
            Authorization: 'Bearer ' + token
        });
        return this.http.post(`${this.API_URL}/create-blog`, data, {headers: reqHeader});
    }

    showBlogs() {
        const token = localStorage.getItem('token');
        const reqHeader = this.makeReqHeader(token);
        return this.http.get<BlogInterface[]>(`${this.API_URL}/show-blogs`, {headers: reqHeader});
    }

    deleteBlog(id) {
        const token = localStorage.getItem('token');
        const reqHeader = this.makeReqHeader(token);
        return this.http.delete(`${this.API_URL}/delete-blog/${id}`, {headers: reqHeader});
    }
}
