import {Component, OnInit} from '@angular/core';
import {AlbumService} from '../../../services/album.service';
import {AlbumInterface} from '../../../album-interface';

@Component({
    selector: 'app-album-lists',
    templateUrl: './album-lists.component.html',
    styleUrls: ['./album-lists.component.sass']
})
export class AlbumListsComponent implements OnInit {
    albums: AlbumInterface[];

    constructor(private albumService: AlbumService) {
    }

    ngOnInit() {
        this.getAllAlbum();
    }

    getAllAlbum() {
        return this.albumService.getAllAlbum().subscribe(data => this.albums = data);
    }
}
