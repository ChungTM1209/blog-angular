import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './user/login/login.component';
import {RegisterComponent} from './user/register/register.component';
import {HomeComponent} from './user/home/home.component';
import {BeforeLoginService} from './services/before-login.service';
import {AfterLoginService} from './services/after-login.service';
import {ProfileComponent} from './user/profile/profile.component';
import {ProfileUpdateComponent} from './user/profile-update/profile-update.component';
import {BlogCreateComponent} from './blog/blog-create/blog-create.component';
import {BlogPostsComponent} from './blog/blog-posts/blog-posts.component';
import {WelcomeComponent} from './welcome/welcome.component';
import {BlogDetailComponent} from './blog/blog-detail/blog-detail.component';
import {BlogUpdateComponent} from './blog/blog-update/blog-update.component';
import {BlogSearchComponent} from './blog/blog-search/blog-search.component';
import {BlogTagComponent} from './blog/blog-tag/blog-tag.component';
import {CommentsComponent} from './comments/comments.component';
import {AlbumComponent} from './user/album/album.component';
import {AlbumListsComponent} from './user/album/album-lists/album-lists.component';
import {AlbumDetailComponent} from './user/album/album-detail/album-detail.component';
import {ChangePasswordComponent} from './user/change-password/change-password.component';

const routes: Routes = [{
    path: '', redirectTo: 'login', pathMatch: 'full'
}, {
    path: 'login',
    component: LoginComponent,
    canActivate: [BeforeLoginService]
}, {
    path: 'register',
    component: RegisterComponent,
    canActivate: [BeforeLoginService]
}, {
    path: 'home',
    component: HomeComponent,
    canActivate: [AfterLoginService],
    children: [{
        path: 'profile',
        component: ProfileComponent,
    }, {
        path: 'change-password',
        component: ChangePasswordComponent
    }, {
        path: 'blogs',
        component: BlogPostsComponent,
    }, {
        path: 'create-blog',
        component: BlogCreateComponent
    }, {
        path: 'create-album',
        component: AlbumComponent
    }, {
        path: 'album-list',
        component: AlbumListsComponent
    }, {
        path: 'profile-update',
        component: ProfileUpdateComponent
    }, {
        path: 'album-detail/:id',
        component: AlbumDetailComponent,
    }, {
        path: 'blog-detail/:id',
        component: BlogDetailComponent,
        children: [{
            path: 'comments/:id',
            component: CommentsComponent
        }]
    }, {
        path: 'blog-update/:id',
        component: BlogUpdateComponent
    }, {
        path: 'search/:keyWords',
        component: BlogSearchComponent
    }, {
        path: 'blog-tag/:tagName',
        component: BlogTagComponent
    }]
}, {
    path: 'welcome',
    component: WelcomeComponent
}];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
