import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {BlogService} from '../../services/blog.service';
import {Router} from '@angular/router';
import {ErrorStateMatcher, MatAutocomplete, MatAutocompleteSelectedEvent, MatChipInputEvent} from '@angular/material';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {COMMA, ENTER, TAB} from '@angular/cdk/keycodes';

export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}


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
    visible = true;
    selectable = true;
    removable = true;
    addOnBlur = true;
    separatorKeysCodes: number[] = [COMMA, TAB, ENTER];
    tag = new FormControl();
    tags: string[] = [];
    allTags;
    @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
    @ViewChild('auto') matAutocomplete: MatAutocomplete;

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
        this.blogService.getAllTags().subscribe(
            next => this.allTags = next
        );

    }

    create() {
        if (this.blogCreateForm.valid) {
            const data = new FormData();
            data.append('title', this.blogCreateForm.value.title);
            data.append('contents', this.blogCreateForm.value.contents);
            data.append('description', this.blogCreateForm.value.description);
            data.append('image', this.selectedFile);
            for (let i = 0; i < this.tags.length; i++) {
                data.append('tag' + i, this.tags[i]);
            }

            return this.blogService.createBlog(data).subscribe(() => this.handleResponse());
        }
    }

    uploadFile(event) {
        this.selectedFile = event.target.files[0];
        return this.selectedFile;
    }

    private handleResponse() {
        alert('Create successfully');
        this.router.navigateByUrl('/home/blogs');
    }

    add(event: MatChipInputEvent): void {
        if (!this.matAutocomplete.isOpen) {
            const input = event.input;
            const value = event.value;
            if ((value || '').trim()) {
                this.tags.push(value.trim());
            }

            if (input) {
                input.value = '';
            }
            this.tag.setValue(null);
        }
    }

    remove(tag: string): void {
        const index = this.tags.indexOf(tag);
        if (index >= 0) {
            this.tags.splice(index, 1);
        }

    }

    selected(event: MatAutocompleteSelectedEvent): void {
        this.tags.push(event.option.viewValue);
        this.tagInput.nativeElement.value = '';
        this.tag.setValue(null);
    }


}
