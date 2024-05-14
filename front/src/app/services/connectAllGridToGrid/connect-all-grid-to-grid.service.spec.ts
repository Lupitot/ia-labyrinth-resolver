import { TestBed } from '@angular/core/testing';

import { ConnectAllGridToGridService } from './connect-all-grid-to-grid.service';

describe('ConnectAllGridToGridService', () => {
  let service: ConnectAllGridToGridService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConnectAllGridToGridService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
