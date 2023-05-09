import { TestBed } from '@angular/core/testing';

import { PostControllerService } from './post-controller.service';
import { PostGatewayService } from '../persistence/post-gateway.service';
import { createPostMock } from '../entities/Posts.mock';

import { of } from 'rxjs';

describe('PostControllerService', () => {
  let postControllerService: PostControllerService;
  let postGatewayServiceSpy: jasmine.SpyObj<PostGatewayService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('PostGatewayService', ['getAllPosts']);

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

  describe('getPostsByPage', () => {
    it('should return the posts', (doneFn) => {
      const mockData = createPostMock(20);

      postGatewayServiceSpy.getAllPosts.and.returnValue(of(mockData));

      postControllerService.getPosts().subscribe((data) => {
        expect(data.length).toEqual(mockData.length);
        doneFn();
      });
    });
  });
});
