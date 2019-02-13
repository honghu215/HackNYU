import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterPopoverPage } from './filter-popover.page';

describe('FilterPopoverPage', () => {
  let component: FilterPopoverPage;
  let fixture: ComponentFixture<FilterPopoverPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterPopoverPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterPopoverPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
