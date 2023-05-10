import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostControllerService } from 'src/app/domain/post-controller.service';
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
  @Output() deletedElement = new EventEmitter<number>();

  constructor(
    private route: ActivatedRoute,
    private postController: PostControllerService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      let currentPage: number = parseInt(params.get('page') ?? '1');
      this.firstPost = (currentPage - 1) * 15;
      this.lastPost = this.firstPost + 15;
    });
  }

  deletePost(id: number): void {
    this.postController.deletePost(id);
    this.deletedElement.emit(id);
  }
}
