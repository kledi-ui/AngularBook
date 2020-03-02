import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldpickerupdateComponent } from './fieldpickerupdate.component';

describe('FieldpickerupdateComponent', () => {
  let component: FieldpickerupdateComponent;
  let fixture: ComponentFixture<FieldpickerupdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldpickerupdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldpickerupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
