import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialNetworksLoginButtonsComponent } from './social-networks-login-buttons.component';

describe('SocialNetworksLoginButtonsComponent', () => {
  let component: SocialNetworksLoginButtonsComponent;
  let fixture: ComponentFixture<SocialNetworksLoginButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocialNetworksLoginButtonsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocialNetworksLoginButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
