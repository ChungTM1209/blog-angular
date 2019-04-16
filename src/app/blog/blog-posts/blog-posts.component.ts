import { Component, OnInit } from '@angular/core';
import {BlogService} from '../../services/blog.service';
import {BlogInterface} from '../../blog-interface';

@Component({
  selector: 'app-blog-posts',
  templateUrl: './blog-posts.component.html',
  styleUrls: ['./blog-posts.component.sass']
})
export class BlogPostsComponent implements OnInit {
  blogs: BlogInterface[];
  blog: BlogInterface;
  constructor(private blogService: BlogService) { }

  ngOnInit() {
    this.showBlogs();
  }
  showBlogs() {
    return this.blogService.showBlogs().subscribe(data => this.handleResponse(data));
  }
  handleResponse(data) {
    this.blogs = data;
  }
}
