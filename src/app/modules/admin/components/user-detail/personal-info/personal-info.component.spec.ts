import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtModule } from '@auth0/angular-jwt';
import { of } from 'rxjs/internal/observable/of';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { UserService } from 'src/app/services/user.service';

import { PersonalInfoComponent } from './personal-info.component';

export class MatDialogMock {
  open() {
    return {
      afterClosed: () => of(true),
    };
  }
}

const data = {
    identification: '12345679',
    email:'test@h.com',
    cellphone:'300000000',
    address: 'calle falsa 123',
    userId: 1
}

const response = {
  state: 'Success',
  userMessage: 'La informacion se ha actualizado',
  objectResponse: true,
};

describe('PersonalInfoComponent', () => {
  let component: PersonalInfoComponent;
  let fixture: ComponentFixture<PersonalInfoComponent>;

  const mockUserService = jasmine.createSpyObj('UserService', ['updateInfoClicker']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalInfoComponent ],
      imports:[
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        AppMaterialModule,
        JwtModule.forRoot({
          config: {
            tokenGetter: () => {
              return localStorage.getItem('ACCESS_TOKEN');
            },
            throwNoTokenError: true,
            allowedDomains: [],
            disallowedRoutes: [],
          },
        }),
      ],
      providers: [
        { provide: MatDialogRef, useValue: MatDialogMock },
        { provide: MAT_DIALOG_DATA, useValue: data },
        { provide: UserService, useValue: mockUserService },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalInfoComponent);
    component = fixture.componentInstance;
    component.data = data;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('save info personal', () => {
    mockUserService.updateInfoClicker.and.returnValue(of(response));
    component.saveInfoPersonal();
    expect(mockUserService.updateInfoClicker).toHaveBeenCalled();

  });

  it('save info personal error', () => {
    mockUserService.updateInfoClicker.and.returnValue(of({}));
    component.saveInfoPersonal();
    expect(mockUserService.updateInfoClicker).toHaveBeenCalled();
  });

  it('edit info personal', () => {
    component.editInfoPersonal();
    expect(component.templatePersonalInfo).toBeDefined();
  });


});
