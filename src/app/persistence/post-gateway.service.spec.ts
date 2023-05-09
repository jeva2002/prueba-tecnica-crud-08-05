import { TestBed } from '@angular/core/testing';

import { PostGatewayService } from './post-gateway.service';

describe('PostGatewayService', () => {
  let service: PostGatewayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostGatewayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
