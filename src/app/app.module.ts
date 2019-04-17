import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavbarComponent} from './user/navbar/navbar.component';
import {HomeComponent} from './user/home/home.component';
import {LoginComponent} from './user/login/login.component';
import {RegisterComponent} from './user/register/register.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ProfileComponent } from './user/profile/profile.component';
import { ProfileUpdateComponent } from './user/profile-update/profile-update.component';
import { BlogCreateComponent } from './blog/blog-create/blog-create.component';
import { BlogPostsComponent } from './blog/blog-posts/blog-posts.component';
import { WelcomeComponent } from './welcome/welcome.component';

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
        HomeComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
