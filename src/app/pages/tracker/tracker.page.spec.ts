import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackerPage } from './tracker.page';

describe('TrackerPage', () => {
  let component: TrackerPage;
  let fixture: ComponentFixture<TrackerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
