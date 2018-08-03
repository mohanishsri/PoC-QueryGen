import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DislpayresultComponent } from './dislpayresult.component';

describe('DislpayresultComponent', () => {
  let component: DislpayresultComponent;
  let fixture: ComponentFixture<DislpayresultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DislpayresultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DislpayresultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
