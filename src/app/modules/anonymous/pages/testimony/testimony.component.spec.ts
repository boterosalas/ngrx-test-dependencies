import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

import { TestimonyComponent } from './testimony.component';

describe('TestimonyComponent', () => {
  let component: TestimonyComponent;
  let fixture: ComponentFixture<TestimonyComponent>;

  const mockUserService = jasmine.createSpyObj('UserService', ['getTestimoniesUser']);

  const testominies = {
    withPhoto: [
      {
        id: '1',
        orderby: 0,
        username: 'Olga Lucía',
        usersocialnetwork: '@olga.lucia',
        testimony:
          'Los testimonios pueden ser un recurso poderoso para poder establecer un vínculo de confianza entre tus clientes nuevos. Es parte de lo que se conoce como la demostración social (social proof) y en el marketing es un medio poderoso para persuadir a tus visitantes de realizar cierta acción.',
        link: 'https://www.youtube.com/watch?v=rRXxrFqIwic',
        active: true,
        imageurl: "https://webclickamdev.blob.core.windows.net/img-ofertas/testimonies/20220209172122.jpg",
        rate: 4
      },
    ],
    withoutPhoto: [
      {
        id: '1',
        orderby: 0,
        username: 'Olga Lucía',
        usersocialnetwork: '@olga.lucia',
        testimony:
          'Los testimonios pueden ser un recurso poderoso para poder establecer un vínculo de confianza entre tus clientes nuevos. Es parte de lo que se conoce como la demostración social (social proof) y en el marketing es un medio poderoso para persuadir a tus visitantes de realizar cierta acción.',
        link: 'https://www.youtube.com/watch?v=rRXxrFqIwic',
        active: true,
        imageurl: "https://webclickamdev.blob.core.windows.net/img-ofertas/testimonies/20220209172122.jpg",
        rate: 4
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
        imageurl: "https://webclickamdev.blob.core.windows.net/img-ofertas/testimonies/20220209172122.jpg",
        rate: 4
      },
    ],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestimonyComponent],
      imports: [HttpClientTestingModule],
      providers: [{ provide: UserService, useValue: mockUserService }],
    }).compileComponents();
    mockUserService.getTestimoniesUser.and.returnValue(of(testominies));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestimonyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
