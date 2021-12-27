import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopRewardComponent } from './top-reward.component';

describe('TopRewardComponent', () => {
  let component: TopRewardComponent;
  let fixture: ComponentFixture<TopRewardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopRewardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopRewardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
