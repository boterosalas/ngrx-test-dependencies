import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaingsComponent } from './campaings.component';

describe('CampaingsComponent', () => {
  let component: CampaingsComponent;
  let fixture: ComponentFixture<CampaingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
