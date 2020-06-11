import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkHistoryComponent } from './link-history.component';

describe('LinkHistoryComponent', () => {
  let component: LinkHistoryComponent;
  let fixture: ComponentFixture<LinkHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
