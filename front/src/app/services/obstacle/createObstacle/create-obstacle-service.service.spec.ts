import { TestBed } from '@angular/core/testing';

import { CreateObstacleServiceService } from './create-obstacle-service.service';

describe('CreateObstacleServiceService', () => {
  let service: CreateObstacleServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateObstacleServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
