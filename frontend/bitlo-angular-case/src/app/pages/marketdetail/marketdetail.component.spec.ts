import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketdetailComponent } from './marketdetail.component';

describe('MarketdetailComponent', () => {
  let component: MarketdetailComponent;
  let fixture: ComponentFixture<MarketdetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MarketdetailComponent]
    });
    fixture = TestBed.createComponent(MarketdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
