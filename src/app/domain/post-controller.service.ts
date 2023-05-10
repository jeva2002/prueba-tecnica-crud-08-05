import { Injectable } from '@angular/core';

import { catchError, take, BehaviorSubject, of } from 'rxjs';

import { PostGatewayService } from '../persistence/post-gateway.service';
import { NewPostDTO, Post, UpdatedPostDTO } from '../entities/Posts';
import { ALERT_MESSAGES } from '../entities/Alert';
import { AlertControllerService } from './alert-controller.service';

@Injectable({
  providedIn: 'root',
})
export class PostControllerService {
  private posts$: BehaviorSubject<Post[]> = new BehaviorSubject<Post[]>([]);

  constructor(
    private postGateway: PostGatewayService,
    private alertController: AlertControllerService
  ) {}

  public getPosts(): Post[] {
    if (!this.posts$.value.length)
      this.postGateway.getAllPosts().subscribe((posts) => {
        this.setPosts(posts);
      });
    return this.posts$.value;
  }

  public getPostsObservable(): BehaviorSubject<Post[]> {
    if (!this.posts$.value.length)
      this.postGateway.getAllPosts().subscribe((posts) => {
        this.setPosts(posts);
      });
    return this.posts$;
  }

  public setPosts(posts: Post[]): void {
    this.posts$.next([...posts]);
  }

  public getPostById(id: number): Post | undefined {
    const targetPost = this.posts$.getValue().find((post) => post.id === id);
    return targetPost;
  }

  public addPost(newPost: NewPostDTO): void {
    this.postGateway
      .addPost(newPost)
      .pipe(
        take(1),
        catchError(() => of(new Error()))
      )
      .subscribe((createdPost) => {
        if (createdPost instanceof Error) {
          this.handleError('Se ha fallado al crear');
        } else {
          this.setPosts([...this.posts$.getValue(), createdPost]);
          this.handleSuccess('Se ha creado el post');
        }
      });
  }

  public updatePost(update: UpdatedPostDTO): void {
    const targetPost = this.getPostById(update.id);
    if (targetPost) {
      this.postGateway
        .updatePost({ ...targetPost, ...update })
        .pipe(
          take(1),
          catchError(() => of(new Error()))
        )
        .subscribe((updatedPost) => {
          if (updatedPost instanceof Error) {
            this.handleError('Se ha fallado al actualizar');
          } else {
            const posts = [...this.posts$.getValue()];
            const index = posts.findIndex((post) => post.id === update.id);
            posts[index] = updatedPost;
            this.setPosts(posts);
            this.handleSuccess('Se ha actualizado el post');
          }
        });
    }
  }

  public deletePost(id: number): void {
    this.postGateway
      .deletePost(id)
      .pipe(
        take(1),
        catchError(() => of(new Error()))
      )
      .subscribe((error) => {
        if (error instanceof Error) {
          this.handleError('Se ha fallado en eliminar');
        } else {
          this.handleSuccess('Se ha eliminado el post');
        }
      });
    this.setPosts(this.posts$.getValue().filter((post) => post.id !== id));
  }

  public handleError(title: string): void {
    this.alertController.setAlert({
      message: ALERT_MESSAGES.ERROR,
      title,
    });
  }

  public handleSuccess(title: string): void {
    this.alertController.setAlert({
      message: ALERT_MESSAGES.SUCCESS,
      title,
    });
  }
}
