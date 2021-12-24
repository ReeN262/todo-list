import { TestBed } from '@angular/core/testing';

import { InProgressService } from './inProgress.service';

describe('DoneTaskService', () => {
  let service: InProgressService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InProgressService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
