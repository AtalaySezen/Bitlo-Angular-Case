import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpentransactionsComponent } from './opentransactions.component';

describe('OpentransactionsComponent', () => {
  let component: OpentransactionsComponent;
  let fixture: ComponentFixture<OpentransactionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OpentransactionsComponent]
    });
    fixture = TestBed.createComponent(OpentransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
