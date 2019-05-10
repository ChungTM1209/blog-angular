import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlbumService} from '../../services/album.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-album',
    templateUrl: './album.component.html',
    styleUrls: ['./album.component.sass']
})
export class AlbumComponent implements OnInit {
    albumCreateForm: FormGroup;
    selectedFile: File[] = null;

    constructor(private fb: FormBuilder,
                private albumService: AlbumService,
                private route: Router) {
    }

    ngOnInit() {
        this.albumCreateForm = this.fb.group({
            name: ['', Validators.required],
            title: ['', Validators.required],
        });
    }

    uploadFile(event) {
        this.selectedFile = event.target.files;
        return this.selectedFile;
    }

    create() {
        const {value} = this.albumCreateForm;
        const data = new FormData();
        data.append('name', value.name);
        data.append('title', value.title);
        for (let i = 0; i < this.selectedFile.length; i++) {
            data.append('images' + i, this.selectedFile[i]);
        }
        return this.albumService.createAlbum(data).subscribe(() => this.handleResponse());
    }
    handleResponse() {
        alert('Create Album Successfully');
        this.route.navigateByUrl('/home/album-list');
    }
}
