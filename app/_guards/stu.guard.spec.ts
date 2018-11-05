import { TestBed, async, inject } from '@angular/core/testing';

import { StuGuard } from './stu.guard';

describe('StuGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StuGuard]
    });
  });

  it('should ...', inject([StuGuard], (guard: StuGuard) => {
    expect(guard).toBeTruthy();
  }));
});
