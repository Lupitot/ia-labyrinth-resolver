import { TestBed } from '@angular/core/testing';

import { CreateGridServiceService } from './create-grid-service.service';

describe('CreateGridServiceService', () => {
  let service: CreateGridServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateGridServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
