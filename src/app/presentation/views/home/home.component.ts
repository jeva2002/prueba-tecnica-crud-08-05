import { Component, OnInit } from '@angular/core';
import { Observable, take } from 'rxjs';
import { PostControllerService } from 'src/app/domain/post-controller.service';
import { UsersControllerService } from 'src/app/domain/users-controller.service';
import { Post } from 'src/app/entities/Posts';
import { User } from 'src/app/entities/Users';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  posts$: Observable<Post[]> = new Observable();
  users$: Observable<User[]> = new Observable();

  constructor(
    private usersController: UsersControllerService,
    private postsController: PostControllerService
  ) {}

  ngOnInit(): void {
    this.users$ = this.usersController.getAllUsers();
    this.posts$ = this.postsController.getPosts();
  }

  public getPagesByPosts(posts: Post[]): number {
    return Math.ceil(posts.length / 15);
  }
}
