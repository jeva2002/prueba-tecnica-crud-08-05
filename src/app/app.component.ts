import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';

import { PostControllerService } from './domain/post-controller.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'CRUD post app';

  constructor(private postsController: PostControllerService) {}

  ngOnInit(): void {
    this.postsController.getPosts().pipe(take(1)).subscribe();
  }
}
