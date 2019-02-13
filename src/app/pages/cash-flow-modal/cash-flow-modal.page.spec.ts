import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashFlowModalPage } from './cash-flow-modal.page';

describe('CashFlowModalPage', () => {
  let component: CashFlowModalPage;
  let fixture: ComponentFixture<CashFlowModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashFlowModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashFlowModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
