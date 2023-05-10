import { Injectable } from '@angular/core';

import { Observable, map, take, of } from 'rxjs';

import { PostGatewayService } from '../persistence/post-gateway.service';
import { NewPostDTO, Post, UpdatedPostDTO } from '../entities/Posts';

@Injectable({
  providedIn: 'root',
})
export class PostControllerService {
  private posts$: Observable<Post[]> | undefined;

  constructor(private postGateway: PostGatewayService) {}

  public getPosts(): Observable<Post[]> {
    if (!this.posts$) this.posts$ = this.postGateway.getAllPosts();
    return this.posts$;
  }

  public setPosts(posts: Post[]): void {
    this.posts$ = of(posts);
  }

  public getPostById(id: number): Observable<Post | undefined> | void {
    const targetPost = this.posts$?.pipe(
      map((posts) => posts.find((post) => post.id === id))
    );
    if (targetPost) return targetPost;
  }

  public addPost(newPost: NewPostDTO): void {
    this.postGateway
      .addPost(newPost)
      .pipe(take(1))
      .subscribe((createdPost) => {
        if (!!this.posts$) {
          this.posts$ = this.posts$.pipe(
            map((posts) => {
              return [...posts, createdPost];
            })
          );
        } else this.posts$ = of([createdPost]);
      });
  }

  public updatePost(update: UpdatedPostDTO): void {
    this.getPostById(update.id)?.subscribe((targetPost) => {
      if (targetPost) {
        this.postGateway
          .updatePost({ ...targetPost, ...update })
          .pipe(take(1))
          .subscribe((updatedPost) => {
            this.posts$ = this.posts$?.pipe(
              map((posts) => {
                const index = posts.findIndex((post) => post.id === update.id);
                posts[index] = updatedPost;
                return posts;
              })
            );
          });
      }
    });
  }

  public deletePost(id: number): void {
    this.postGateway.deletePost(id);
    if (this.posts$) {
      this.posts$ = this.posts$.pipe(
        map((posts) => {
          return posts.filter((post) => post.id !== id);
        })
      );
    }
    this.posts$?.subscribe((alg) => console.log(alg.length));
  }
}
