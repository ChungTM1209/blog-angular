import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AlbumService} from '../../../services/album.service';
import {AlbumInterface} from '../../../album-interface';

@Component({
    selector: 'app-album-detail',
    templateUrl: './album-detail.component.html',
    styleUrls: ['./album-detail.component.sass']
})
export class AlbumDetailComponent implements OnInit {
album: AlbumInterface;
    constructor(private activatedRoute: ActivatedRoute,
                private albumService: AlbumService) {
        this.album = {
            id: null,
        name: null,
        title: null,
        created_at: null,
        images: null,
        };
    }

    ngOnInit() {
        this.showAlbumDetail();
    }

    showAlbumDetail() {
        const id = +this.activatedRoute.snapshot.paramMap.get('id');
        return this.albumService.showDetailAlbum(id).subscribe(
            data => this.album = data
        );
    }
}
