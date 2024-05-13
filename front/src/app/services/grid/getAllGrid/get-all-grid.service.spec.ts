import { TestBed } from '@angular/core/testing';

import { GetAllGridService } from './get-all-grid.service';

describe('GetAllGridService', () => {
  let service: GetAllGridService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetAllGridService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
