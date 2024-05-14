import { TestBed } from '@angular/core/testing';

import { GetObstaclesServiceService } from './get-obstacles-service.service';

describe('GetObstaclesServiceService', () => {
  let service: GetObstaclesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetObstaclesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
