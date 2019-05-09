import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {BlogInterface} from '../../blog-interface';
import {BlogService} from '../../services/blog.service';
import {ActivatedRoute, Router} from '@angular/router';
import {COMMA, ENTER, TAB} from '@angular/cdk/keycodes';
import {MatAutocomplete, MatAutocompleteSelectedEvent, MatChipInputEvent} from '@angular/material';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
    selector: 'app-blog-update',
    templateUrl: './blog-update.component.html',
    styleUrls: ['./blog-update.component.sass']
})
export class BlogUpdateComponent implements OnInit {
    options: FormGroup;
    blog: BlogInterface;
    blogUpdateForm: FormGroup;
    selectedFile: File = null;
    visible = true;
    selectable = true;
    removable = true;
    addOnBlur = true;
    separatorKeysCodes: number[] = [COMMA, TAB, ENTER];
    tag = new FormControl();
    tags: string[] = [];
    allTags;
    public Editor = ClassicEditor;
    @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
    @ViewChild('auto') matAutocomplete: MatAutocomplete;
    constructor(private fb: FormBuilder,
                private blogService: BlogService,
                private route: ActivatedRoute,
                private router: Router) {
        this.options = fb.group({
            hideRequired: false,
            floatLabel: 'auto',
        });
        this.blog = {
            title: null,
            content: null,
            description: null,
            id: null,
            image: null,
            tag: null,
            video: null
        };
    }

    ngOnInit() {
        this.blogUpdateForm = this.fb.group({
            title: [''],
            content: [''],
            description: [''],
            video: ['']

        });
        const id = +this.route.snapshot.paramMap.get('id');
        this.blogService.showBlogDetail(id).subscribe(
            (data) => {
                this.blog = data;
                this.changeToArray(data.tag);
                this.blogUpdateForm.patchValue(data);
            }
        );
        this.blogService.getAllTags().subscribe(
            next => this.allTags = next
        );
    }

    updateBlog() {
        const {value} = this.blogUpdateForm;
        if (this.selectedFile === null) {
            const blogUpdate = new FormData();
            blogUpdate.append('title', value.title);
            blogUpdate.append('contents', value.content);
            blogUpdate.append('description', value.description);
            blogUpdate.append('video', value.video);
            for (let i = 0; i < this.tags.length; i++) {
                blogUpdate.append('tag' + i, this.tags[i]);
            }
            return this.blogService.updateBlog(this.blog.id, blogUpdate).subscribe(
                () => this.handleResponse(),
                error1 => console.log(error1)
            );
        } else {
            const blogUpdate = new FormData();
            blogUpdate.append('title', value.title);
            blogUpdate.append('contents', value.content);
            blogUpdate.append('description', value.description);
            blogUpdate.append('video', value.video);
            blogUpdate.append('image', this.selectedFile);
            for (let i = 0; i < this.tags.length; i++) {
                blogUpdate.append('tag' + i, this.tags[i]);
            }
            return this.blogService.updateBlog(this.blog.id, blogUpdate).subscribe(
                () => this.handleResponse(),
                error1 => console.log(error1)
            );
        }

    }

    handleResponse() {
        alert('UPDATE SUCCESS');
        return this.router.navigateByUrl('/home/blogs');
    }

    selectFile(event) {
        this.selectedFile = event.target.files[0];
        return this.selectedFile;
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
    changeToArray(data) {
        for (let i = 0; i < data.length; i++) {
            this.tags[i] = data[i].name;
        }
        return this.tags;
    }
}
