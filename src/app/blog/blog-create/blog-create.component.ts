import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {BlogService} from '../../services/blog.service';
import {Router} from '@angular/router';
import {ErrorStateMatcher} from '@angular/material';
export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
    selector: 'app-blog-create',
    templateUrl: './blog-create.component.html',
    styleUrls: ['./blog-create.component.sass']
})
export class BlogCreateComponent implements OnInit {
    blogCreateForm: FormGroup;
    selectedFile: File = null;
    data: FormData;
    matcher = new MyErrorStateMatcher();
    public Editor = ClassicEditor;

    constructor(private fb: FormBuilder,
                private blogService: BlogService,
                private router: Router) {
    }

    ngOnInit() {
        this.blogCreateForm = this.fb.group({
            title: ['', Validators.required],
            contents: ['', Validators.required],
            description: ['', Validators.required],
            image: ['', Validators.required],
        });
    }

    create() {
        if (this.blogCreateForm.valid) {
            const data = new FormData();
            data.append('title', this.blogCreateForm.value.title);
            data.append('contents', this.blogCreateForm.value.contents);
            data.append('description', this.blogCreateForm.value.description);
            data.append('image', this.selectedFile);
            return this.blogService.createBlog(data).subscribe(() => this.handleResponse());
        }
    }

    uploadFile(event) {
        this.selectedFile = event.target.files[0];
        console.log(this.selectedFile);
        return this.selectedFile;
    }

    private handleResponse() {
        alert('Create successfully');
        this.router.navigateByUrl('/home/blogs');
    }
}
