import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuOptionsComponent } from './menu-options.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from 'src/app/services/auth.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

xdescribe('MenuOptionsComponent', () => {
  let component: MenuOptionsComponent;
  let fixture: ComponentFixture<MenuOptionsComponent>;

  const mockAuthService = jasmine.createSpyObj("AuthService", ["isLoggedIn"]);

  let menuAnymous = {
    "state": "Success",
    "userMessage": null,
    "objectResponse": [
        {
            "name": "Click Academy",
            "route": "click-academy"
        },
        {
            "name": "Ofertas",
            "route": "ofertas"
        },
        {
            "name": "Inicio",
            "route": "/"
        }
    ]
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuOptionsComponent ],
      imports: [
        RouterTestingModule.withRoutes([]),
        HttpClientTestingModule
      ],
      providers: [
        { provide: AuthService, useValue: mockAuthService }
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents();
    // mockAuthService.menuInfo$.pipe().and.returnValue(of(menuAnymous));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
