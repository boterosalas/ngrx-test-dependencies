import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtModule } from '@auth0/angular-jwt';
import { of } from 'rxjs';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { TruncatePipe } from 'src/app/pipes/truncate.pipe';
import { UserService } from 'src/app/services/user.service';
import { FormTestimonyComponent } from '../form-testimony/form-testimony.component';

import { TableTestimonyComponent } from './table-testimony.component';

describe('TableTestimonyComponent', () => {
  let component: TableTestimonyComponent;
  let fixture: ComponentFixture<TableTestimonyComponent>;

  const mockUserService = jasmine.createSpyObj('UserService', [
    'getTestimonies',
    'deleteTestimonies',
    'saveActiveTestimonies',
    'saveOrderTestimonies',
  ]);

  const data = [
    {
      id: '1',
      orderby: 0,
      username: 'Olga Lucía',
      usersocialnetwork: '@olga.lucia',
      testimony:
        'Los testimonios pueden ser un recurso poderoso para poder establecer un vínculo de confianza entre tus clientes nuevos. Es parte de lo que se conoce como la demostración social (social proof) y en el marketing es un medio poderoso para persuadir a tus visitantes de realizar cierta acción.',
      link: 'https://www.youtube.com/watch?v=rRXxrFqIwic',
      active: true,
    },
    {
      id: '2',
      orderby: 1,
      username: 'pepito perez',
      usersocialnetwork: '@perez.pepito',
      testimony:
        'Los testimonios pueden ser un recurso poderoso para poder establecer un vínculo de confianza entre tus clientes nuevos. Es parte de lo que se conoce como la demostración social (social proof) y en el marketing es un medio poderoso para persuadir a tus visitantes de realizar cierta acción.',
      link: 'https://www.youtube.com/watch?v=rRXxrFqIwic',
      active: false,
    },
  ];

  const item = {
    id: '1',
    orderby: 0,
    username: 'Olga Lucía',
    usersocialnetwork: '@olga.lucia',
    testimony:
      'Los testimonios pueden ser un recurso poderoso para poder establecer un vínculo de confianza entre tus clientes nuevos. Es parte de lo que se conoce como la demostración social (social proof) y en el marketing es un medio poderoso para persuadir a tus visitantes de realizar cierta acción.',
    link: 'https://www.youtube.com/watch?v=rRXxrFqIwic',
    active: true,
  };

  let response = {
    state: 'Success',
    userMessage: 'Los ha guardado',
    objectResponse: true,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableTestimonyComponent, TruncatePipe, FormTestimonyComponent],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule,
        AppMaterialModule,
        RouterTestingModule,
        BrowserAnimationsModule,
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
      providers: [{ provide: UserService, useValue: mockUserService }],
    })
      .overrideModule(BrowserDynamicTestingModule, {
        set: {
          entryComponents: [FormTestimonyComponent],
        },
      })
      .compileComponents();
    mockUserService.getTestimonies.and.returnValue(of(data));
    mockUserService.deleteTestimonies.and.returnValue(of(response));
    mockUserService.saveActiveTestimonies.and.returnValue(of(response));
    mockUserService.saveOrderTestimonies.and.returnValue(of(response));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableTestimonyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('delete item', () => {
    const id = '1';
    component.deleteItem(id);
    const button = document.querySelector('.updateokdelete');
    button.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(mockUserService.getTestimonies).toHaveBeenCalled();
  });

  it('Edit item', () => {
    component.editItem(item);
    expect(mockUserService.getTestimonies).toHaveBeenCalled();
  });

  it('create testimony', () => {
    component.openModalTestimony();
    expect(mockUserService.getTestimonies).toHaveBeenCalled();
  });

  it('activate testimony', () => {
    const event = {
      checked: true,
    };
    component.visible(event, '1');
    expect(mockUserService.saveActiveTestimonies).toHaveBeenCalled();
  });

  it('drop', () => {
    const event: any = {
      item: {
        data
      },
      currentIndex: 1,
      previousIndex: 0
    };
    component.dropTable(event);
    expect(mockUserService.saveOrderTestimonies).toHaveBeenCalled();
  });
  



});
