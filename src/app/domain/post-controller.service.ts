import { Injectable } from '@angular/core';

import { catchError, take, BehaviorSubject } from 'rxjs';

import { PostGatewayService } from '../persistence/post-gateway.service';
import { NewPostDTO, Post, UpdatedPostDTO } from '../entities/Posts';

@Injectable({
  providedIn: 'root',
})
export class PostControllerService {
  private posts$: BehaviorSubject<Post[]> = new BehaviorSubject<Post[]>([]);

  constructor(private postGateway: PostGatewayService) {}

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
      .pipe(take(1))
      .subscribe((createdPost) => {
        this.setPosts([...this.posts$.getValue(), createdPost]);
      });
  }

  public updatePost(update: UpdatedPostDTO): void {
    const targetPost = this.getPostById(update.id);
    if (targetPost) {
      this.postGateway
        .updatePost({ ...targetPost, ...update })
        .pipe(take(1))
        .subscribe((updatedPost) => {
          const posts = [...this.posts$.getValue()];
          const index = posts.findIndex((post) => post.id === update.id);
          posts[index] = updatedPost;
          this.setPosts(posts);
        });
    }
  }

  public deletePost(id: number): void {
    this.postGateway.deletePost(id);
    this.setPosts(this.posts$.getValue().filter((post) => post.id !== id));
  }
}
