import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserInterface} from '../user-interface';
import {BlogInterface} from '../blog-interface';

@Injectable({
    providedIn: 'root'
})
export class BlogService {
    readonly API_URL = 'http://127.0.0.1:8000/api';

    constructor(private http: HttpClient) {
    }

    login(data) {
        return this.http.post(`${this.API_URL}/login`, data);
    }

    register(data) {
        return this.http.post(`${this.API_URL}/register`, data);
    }


    getUserData() {
        return this.http.get<UserInterface>(`${this.API_URL}/me`, {headers: this.makeReqHeaderJson()});
    }

    updateProfile(data) {
        return this.http.post(`${this.API_URL}/update`, data, {headers: this.makeReqHeaderData()});
    }

    makeReqHeaderJson() {
        const token = localStorage.getItem('token');
        return new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        });
    }

    makeReqHeaderData() {
        const token = localStorage.getItem('token');
        return new HttpHeaders({
            enctype: 'multipart/form-data',
            Authorization: 'Bearer ' + token
        });
    }

    createBlog(data) {
        return this.http.post(`${this.API_URL}/create-blog`, data, {headers: this.makeReqHeaderData()});
    }

    showBlogs() {
        return this.http.get<BlogInterface[]>(`${this.API_URL}/show-blogs`, {headers: this.makeReqHeaderJson()});
    }

    deleteBlog(id) {
        return this.http.delete(`${this.API_URL}/delete-blog/${id}`, {headers: this.makeReqHeaderJson()});
    }

    showBlogDetail(id) {
        return this.http.get<BlogInterface>(`${this.API_URL}/blog-detail/${id}`, {headers: this.makeReqHeaderJson()});
    }

    updateBlog(id, data) {
        return this.http.post(`${this.API_URL}/blog-update/${id}`, data, {headers: this.makeReqHeaderData()});
    }

    search(keyWords: string) {
        return this.http.post<BlogInterface[]>(`${this.API_URL}/search`, {keyWords}, {headers: this.makeReqHeaderJson()});
    }
}
