import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtModule } from '@auth0/angular-jwt';
import { of } from 'rxjs';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { UserService } from 'src/app/services/user.service';

import { FormTestimonyComponent } from './form-testimony.component';

// export class MatDialogMock {
//   close: () => { }
//   closeAll() {
//     return {
//       closeAll: () => of(true),
//     };
//   }
//   open() {
//     return {
//       afterClosed: () => of(true),
//     };
//   }
// }

describe('FormTestimonyComponent', () => {
  let component: FormTestimonyComponent;
  let fixture: ComponentFixture<FormTestimonyComponent>;

  const mockUserService = jasmine.createSpyObj('UserService', ['saveTestimonies']);

  const dialogMock = {
    close: () => {},
  };

  const data = {
    id:'1',
    orderby: 0,
    username: 'Olga Lucía',
    usersocialnetwork: '@olga.lucia',
    testimony:
      'Los testimonios pueden ser un recurso poderoso para poder establecer un vínculo de confianza entre tus clientes nuevos. Es parte de lo que se conoce como la demostración social (social proof) y en el marketing es un medio poderoso para persuadir a tus visitantes de realizar cierta acción.',
    link: 'https://www.youtube.com/watch?v=rRXxrFqIwic',
    active: true
  };

  let response = {
    state: 'Success',
    userMessage: 'Los ha guardado',
    objectResponse: true,
  };
  

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormTestimonyComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        AppMaterialModule,
        SharedModule,
        RouterTestingModule,
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
        { provide: MatDialogRef, useValue: dialogMock },
        { provide: MAT_DIALOG_DATA, useValue: data },
        { provide: UserService, useValue: mockUserService },
      ],
    })
    .compileComponents();
    mockUserService.saveTestimonies.and.returnValue(of(response));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTestimonyComponent);
    component = fixture.componentInstance;
    component.data = data;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('save testimony', () => {
    component.saveTestimony();
    expect(mockUserService.saveTestimonies).toHaveBeenCalled();
  });
  

});
