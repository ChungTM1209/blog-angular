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

const routes: Routes = [{
    path: 'login',
    component: LoginComponent,
    canActivate: [BeforeLoginService]
}, {
    path: 'register',
    component: RegisterComponent,
    canActivate: [BeforeLoginService]
}, {
    path: 'home',
    component: BlogPostsComponent,
    canActivate: [AfterLoginService],
}, {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AfterLoginService],
}, {
    path: 'update',
    component: ProfileUpdateComponent
},{
    path: 'create-blog',
    component: BlogCreateComponent
}];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
