import { TestBed } from '@angular/core/testing';

import { StudentRecordService } from './student-record.service';

describe('StudentRecordService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StudentRecordService = TestBed.get(StudentRecordService);
    expect(service).toBeTruthy();
  });
});
