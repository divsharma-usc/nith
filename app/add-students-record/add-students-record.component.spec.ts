import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStudentsRecordComponent } from './add-students-record.component';

describe('AddStudentsRecordComponent', () => {
  let component: AddStudentsRecordComponent;
  let fixture: ComponentFixture<AddStudentsRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddStudentsRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStudentsRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
