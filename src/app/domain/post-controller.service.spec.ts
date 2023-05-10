import { TestBed } from '@angular/core/testing';

import { PostControllerService } from './post-controller.service';
import { PostGatewayService } from '../persistence/post-gateway.service';
import { createPostMock, postsMock } from '../entities/Posts.mock';

import { of } from 'rxjs';
import { Post } from '../entities/Posts';

describe('PostControllerService', () => {
  let postControllerService: PostControllerService;
  let postGatewayServiceSpy: jasmine.SpyObj<PostGatewayService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('PostGatewayService', [
      'getAllPosts',
      'addPost',
      'updatePost',
      'deletePost',
    ]);

    TestBed.configureTestingModule({
      providers: [
        PostControllerService,
        { provide: PostGatewayService, useValue: spy },
      ],
    });

    postControllerService = TestBed.inject(PostControllerService);
    postGatewayServiceSpy = TestBed.inject(
      PostGatewayService
    ) as jasmine.SpyObj<PostGatewayService>;
  });

  it('should be created', () => {
    expect(postControllerService).toBeTruthy();
  });

  describe('getAllPosts', () => {
    it('should return the posts', (doneFn) => {
      const mockData = createPostMock(20);

      postGatewayServiceSpy.getAllPosts.and.returnValue(of(mockData));

      const data = postControllerService.getPosts();
      expect(data.length).toBe(mockData.length);
    });
  });

  describe('getPostById', () => {
    it('should return the specified post', (doneFn) => {
      const postsMock = createPostMock(2);
      postControllerService.setPosts([...postsMock]);

      const targetPost = postControllerService.getPostById(postsMock[0].id);
      expect(targetPost?.id).toBe(postsMock[0].id);
    });
  });

  describe('addPost', () => {
    it('should add the new post to the list of posts', (doneFn) => {
      const postsMock = createPostMock(5);
      postControllerService.setPosts([...postsMock]);
      const createdPost = createPostMock(1)[0];
      const { id, ...dto } = createdPost;

      postGatewayServiceSpy.addPost.and.returnValue(of({ ...createdPost }));
      postControllerService.addPost(dto);

      const data = postControllerService.getPosts();
      expect(data.length).toBe(postsMock.length + 1);
    });
  });

  describe('updatePost', () => {
    it('should modify the target post', (doneFn) => {
      const postsMock = createPostMock(1);
      postControllerService.setPosts(postsMock);
      const updatedPost: Post = {
        ...createPostMock(1)[0],
        id: postsMock[0].id,
      };

      postGatewayServiceSpy.updatePost.and.returnValue(of({ ...updatedPost }));
      postControllerService.updatePost(updatedPost);

      const targetPost = postControllerService.getPostById(postsMock[0].id);
      expect(targetPost).toEqual(updatedPost);
    });
  });

  describe('deletePost', () => {
    it('should delete the target post', (doneFn) => {
      const postsMock = createPostMock(2);
      postControllerService.setPosts(postsMock);

      postGatewayServiceSpy.deletePost.and.returnValue();
      postControllerService.deletePost(postsMock[0].id);

      const posts = postControllerService.getPosts();
      expect(posts.length).toBe(postsMock.length - 1);
    });
  });
});
