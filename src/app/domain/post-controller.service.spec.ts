import { TestBed } from '@angular/core/testing';

import { PostControllerService } from './post-controller.service';
import { PostGatewayService } from '../persistence/post-gateway.service';
import { createPostMock, postsMock } from '../entities/Posts.mock';

import { of, take } from 'rxjs';

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

      postControllerService.getPosts().subscribe((data) => {
        expect(data.length).toEqual(mockData.length);
        doneFn();
      });
    });
  });

  describe('Functions that need the posts', () => {
    describe('addPost', () => {
      it('should add the new post to the list of posts', (doneFn) => {
        const postsMock = createPostMock(5);
        postControllerService.posts = of([...postsMock]);
        const createdPost = createPostMock(1)[0];
        const { id, ...dto } = createdPost;

        postGatewayServiceSpy.addPost.and.returnValue(of({ ...createdPost }));
        postControllerService.addPost(dto);

        postControllerService.posts?.pipe(take(1)).subscribe((data) => {
          expect(data.length).toEqual(postsMock.length + 1);
          doneFn();
        });
      });
    });
  });
});
