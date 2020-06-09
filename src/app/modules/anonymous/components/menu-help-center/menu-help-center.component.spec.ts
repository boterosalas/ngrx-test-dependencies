import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuHelpCenterComponent } from './menu-help-center.component';

describe('MenuHelpCenterComponent', () => {
  let component: MenuHelpCenterComponent;
  let fixture: ComponentFixture<MenuHelpCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuHelpCenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuHelpCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
