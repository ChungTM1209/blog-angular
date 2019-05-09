import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavbarComponent} from './user/navbar/navbar.component';
import {HomeComponent} from './user/home/home.component';
import {LoginComponent} from './user/login/login.component';
import {RegisterComponent} from './user/register/register.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ProfileComponent } from './user/profile/profile.component';
import { ProfileUpdateComponent } from './user/profile-update/profile-update.component';
import { BlogCreateComponent } from './blog/blog-create/blog-create.component';
import { BlogPostsComponent } from './blog/blog-posts/blog-posts.component';
import { WelcomeComponent } from './welcome/welcome.component';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {
    MatAutocompleteModule,
    MatButtonModule, MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule, MatChipsModule, MatDatepickerModule,
    MatIconModule,
    MatInputModule,
    MatListModule, MatNativeDateModule, MatPaginatorModule,
    MatSidenavModule
} from '@angular/material';
import {MatSelectModule} from '@angular/material/select';

import {MatFormFieldModule} from '@angular/material/form-field';
import { BlogDetailComponent } from './blog/blog-detail/blog-detail.component';
import { BlogUpdateComponent } from './blog/blog-update/blog-update.component';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import { BlogSearchComponent } from './blog/blog-search/blog-search.component';
import {ShareButtonsModule} from '@ngx-share/buttons';
import {NgxPaginationModule} from 'ngx-pagination';
import { BlogTagComponent } from './blog/blog-tag/blog-tag.component';
import { CommentsComponent } from './comments/comments.component';
import { ReplyComponent } from './reply/reply.component';
import {EmbedVideo} from 'ngx-embed-video/dist';
import { AlbumComponent } from './user/album/album.component';
import { AlbumListsComponent } from './user/album/album-lists/album-lists.component';
import { AlbumDetailComponent } from './user/album/album-detail/album-detail.component';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        LoginComponent,
        RegisterComponent,
        SidebarComponent,
        ProfileComponent,
        ProfileUpdateComponent,
        BlogCreateComponent,
        BlogPostsComponent,
        WelcomeComponent,
        HomeComponent,
        BlogDetailComponent,
        BlogUpdateComponent,
        BlogSearchComponent,
        BlogTagComponent,
        CommentsComponent,
        ReplyComponent,
        AlbumComponent,
        AlbumListsComponent,
        AlbumDetailComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        NoopAnimationsModule,
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        FormsModule,
        MatSidenavModule,
        MatIconModule,
        MatCardModule,
        MatListModule,
        CKEditorModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatChipsModule,
        MatAutocompleteModule,
        ShareButtonsModule,
        MatPaginatorModule,
        NgxPaginationModule,
        MatButtonToggleModule,
        EmbedVideo

    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
