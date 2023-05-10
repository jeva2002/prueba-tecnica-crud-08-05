import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { PostGatewayService } from './post-gateway.service';
import { postsMock } from '../entities/Posts.mock';

describe('PostGatewayService', () => {
  let postService: PostGatewayService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PostGatewayService],
    });
    postService = TestBed.inject(PostGatewayService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(postService).toBeTruthy();
  });

  describe('tests for getAllPosts', () => {
    it('should return a posts list', (doneFn) => {
      postService.getAllPosts().subscribe((data) => {
        expect(data.length).toEqual(postsMock.length);
        doneFn();
      });

      const req = httpController.expectOne(postService.API_URL_POSTS);
      req.flush(postsMock);
      httpController.verify();
    });
  });

  describe('test for addPost', () => {
    it('should return a new product', (doneFn) => {
      const { id, ...newPost } = postsMock[0];

      postService.addPost({ ...newPost }).subscribe((data) => {
        expect(data).toEqual(postsMock[0]);
        doneFn();
      });

      const req = httpController.expectOne(postService.API_URL_POSTS);
      req.flush(postsMock[0]);
      httpController.verify();
    });
  });

  describe('test for updatePost', () => {
    it('should return the updated post', (doneFn) => {
      postService.updatePost({ ...postsMock[0] }).subscribe((data) => {
        expect(data).toEqual(postsMock[0]);
        doneFn();
      });

      const req = httpController.expectOne(
        postService.API_URL_POSTS + `/${postsMock[0].id}`
      );
      req.flush(postsMock[0]);
      httpController.verify();
    });
  });

  describe('test for deletePost', () => {
    it('should delete a post', (doneFn) => {
      postService.deletePost(1).subscribe(() => doneFn());

      const req = httpController.expectOne(
        postService.API_URL_POSTS + `/${postsMock[0].id}`
      );
      req.flush(postsMock[0]);
      expect(req.request.method).toEqual('DELETE');
      httpController.verify();
    });
  });
});
