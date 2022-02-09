import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateTestimonyComponent } from './rate-testimony.component';

describe('RateTestimonyComponent', () => {
  let component: RateTestimonyComponent;
  let fixture: ComponentFixture<RateTestimonyComponent>;

  const testominies = [
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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RateTestimonyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RateTestimonyComponent);
    component = fixture.componentInstance;
    component.testimony = testominies;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('paginate', () => {
    component.pagination(testominies);
    expect(testominies).toBeDefined();
  });
  

});
