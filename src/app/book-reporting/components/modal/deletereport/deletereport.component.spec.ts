import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletereportComponent } from './deletereport.component';

describe('DeletereportComponent', () => {
  let component: DeletereportComponent;
  let fixture: ComponentFixture<DeletereportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletereportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletereportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
