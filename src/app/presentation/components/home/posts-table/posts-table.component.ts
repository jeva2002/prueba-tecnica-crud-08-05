import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertControllerService } from 'src/app/domain/alert-controller.service';
import { PostControllerService } from 'src/app/domain/post-controller.service';
import { ALERT_MESSAGES } from 'src/app/entities/Alert';
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

  constructor(
    private route: ActivatedRoute,
    private postController: PostControllerService,
    private alertController: AlertControllerService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      let currentPage: number = parseInt(params.get('page') ?? '1');
      this.firstPost = (currentPage - 1) * 15;
      this.lastPost = this.firstPost + 15;
    });
  }

  deletePost(id: number): void {
    this.alertController.setAlert({
      message: ALERT_MESSAGES.DELETE,
      title: 'Eliminar el post con el id ' + id,
      actions: {
        continue: () => this.postController.deletePost(id),
      },
    });
  }
}
