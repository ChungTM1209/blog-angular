import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {BlogService} from '../../services/blog.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-blog-create',
    templateUrl: './blog-create.component.html',
    styleUrls: ['./blog-create.component.sass']
})
export class BlogCreateComponent implements OnInit {
    blogCreateForm: FormGroup;
    selectedFile: File = null;
    data: FormData;

    constructor(private fb: FormBuilder,
                private blogService: BlogService,
                private router: Router) {
    }

    ngOnInit() {
        this.blogCreateForm = this.fb.group({
            title: [''],
            content: [''],
            description: [''],
            image: [''],
        });
    }

    create() {
        const data = new FormData();
        data.append('title', this.blogCreateForm.value.title);
        data.append('content', this.blogCreateForm.value.content);
        data.append('description', this.blogCreateForm.value.description);
        data.append('image', this.selectedFile);
        return this.blogService.createBlog(data).subscribe(() => this.handleResponse());
    }

    uploadFile(event) {
        this.selectedFile = event.target.files[0];
        return this.selectedFile;
    }

    private handleResponse() {
        alert('Create successfully');
        this.router.navigateByUrl('/home');
    }
}
