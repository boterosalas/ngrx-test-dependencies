import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtModule } from '@auth0/angular-jwt';
// import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Observable } from 'rxjs';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { TrimPipe } from 'src/app/pipes/trim.pipe';

import { CardCatalogPdfComponent } from './card-catalog-pdf.component';
import { HomeComponent } from 'src/app/modules/anonymous/pages/home/home.component';

describe('CardCatalogPdfComponent', () => {
  let component: CardCatalogPdfComponent;
  let fixture: ComponentFixture<CardCatalogPdfComponent>;

  let socialAuthServiceMock = jasmine.createSpyObj('socialAuthService', ['authState', 'initState', 'refreshAuthToken', 'signIn', 'signOut']);

  const data = {
    id: 3,
    publicationdate: null,
    active: true,
    image: null,
    imageurl: 'https://webclickamdev.blob.core.windows.net/img-ofertas/catalog/20220309171837.jpg',
    startdate: null,
    enddate: '2022-03-10T20:00:00',
    description: 'Nombre del catálogo',
    urls: [
      {
        id: 1,
        date: '2022-03-09T17:18:37.657',
        idcatalog: 3,
        url: 'https://www.exito.com/nevera-no-frost-300-l-grafito-mabe-rma300fjcg-3037854/p',
        idbusiness: 1,
        businessdescription: 'Almacenes Éxito',
      },
      {
        id: 2,
        date: '2022-03-09T17:18:37.657',
        idcatalog: 3,
        url: 'https://www.exito.com/nevera-antartica-400-se-haceb-9002465-3038531/p',
        idbusiness: 1,
        businessdescription: 'Almacenes Éxito',
      },
    ],
    pdf: null,
    pdfurl: 'https://webclickamdev.blob.core.windows.net/img-ofertas/catalog/20220309171837.jpg',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardCatalogPdfComponent, TrimPipe],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'inicio', component: HomeComponent}
        ]),
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
        })
      ],
      providers: [
        // { provide: SocialAuthService, useValue: { ...socialAuthServiceMock, authState: new Observable() } },
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardCatalogPdfComponent);
    component = fixture.componentInstance;
    component.data = data;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
