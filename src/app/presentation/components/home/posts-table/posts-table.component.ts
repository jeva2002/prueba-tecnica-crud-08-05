import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/entities/Posts';

@Component({
  selector: 'app-posts-table',
  templateUrl: './posts-table.component.html',
  styleUrls: ['./posts-table.component.scss'],
})
export class PostsTableComponent implements OnInit {
  firstPost = 0;
  lastPost = this.firstPost + 15;

  @Input() posts: Post[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      let currentPage: number = parseInt(params.get('page') ?? '1');
      this.firstPost = (currentPage - 1) * 15;
      this.lastPost = this.firstPost + 15;
    });
  }
}
