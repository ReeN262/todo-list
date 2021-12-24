import { TestBed } from '@angular/core/testing';

import { DoneTaskService } from './done-task.service';

describe('DoneTaskService', () => {
  let service: DoneTaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoneTaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
