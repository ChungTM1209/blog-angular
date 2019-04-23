import { Component, OnInit } from '@angular/core';
import {BlogService} from '../../services/blog.service';
import {ActivatedRoute} from '@angular/router';
import {UserInterface} from '../../user-interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  opened = true;
  user: UserInterface;
  constructor(private blogService: BlogService,
              private activatedRoute: ActivatedRoute) {
    this.user = {
      name: null,
      email: null,
      age: null,
      phone: null,
      address: null,
      image: null
    };

  }

  ngOnInit() {
    this.blogService.getUserData().subscribe(user => this.user = user);
  }
}
