import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRegComponent } from './edit-reg.component';

describe('EditRegComponent', () => {
  let component: EditRegComponent;
  let fixture: ComponentFixture<EditRegComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRegComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
