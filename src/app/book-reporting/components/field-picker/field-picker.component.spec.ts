import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldPickerComponent } from './field-picker.component';

describe('FieldPickerComponent', () => {
  let component: FieldPickerComponent;
  let fixture: ComponentFixture<FieldPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
