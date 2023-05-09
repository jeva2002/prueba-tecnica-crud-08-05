import { Component, Input } from '@angular/core';
import { Post } from 'src/app/entities/Posts';

@Component({
  selector: 'app-posts-table',
  templateUrl: './posts-table.component.html',
  styleUrls: ['./posts-table.component.scss'],
})
export class PostsTableComponent {
  @Input() posts: Post[] = [];

  firstPost = 0;
  lastPost = this.firstPost + 15;
}
