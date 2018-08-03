import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DyndisplayresultComponent } from './dyndisplayresult.component';

describe('DyndisplayresultComponent', () => {
  let component: DyndisplayresultComponent;
  let fixture: ComponentFixture<DyndisplayresultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DyndisplayresultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DyndisplayresultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
