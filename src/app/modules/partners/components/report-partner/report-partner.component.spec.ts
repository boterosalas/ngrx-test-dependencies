import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtModule } from '@auth0/angular-jwt';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Observable, of } from 'rxjs';
import { DataRangeInterface } from 'src/app/interfaces/dateRangeInterface';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { LinksService } from 'src/app/services/links.service';
import { ReportPartnerComponent } from './report-partner.component';
import { HomeComponent } from 'src/app/modules/anonymous/pages/home/home.component';

describe('ReportPartnerComponent', () => {
  let component: ReportPartnerComponent;
  let fixture: ComponentFixture<ReportPartnerComponent>;

  let mockLinksService = jasmine.createSpyObj('LinksService', ['getBussinessPartnerKPI']);
  let socialAuthServiceMock = jasmine.createSpyObj('socialAuthService', ['authState', 'initState', 'refreshAuthToken', 'signIn', 'signOut']);


  const kpi = {
    state: 'Success',
    userMessage: 'se ha enviado un correo',
    objectResponse: [
      {
        id: 21,
        icon: 'https://webclickamdev.blob.core.windows.net/img-ofertas/dashboard/ico-puntos-colombia.png',
        business: 'Puntos Colombia',
        subtitle: null,
        title: null,
        number: 0.0,
        linksClicked: 0,
        linksGenerated: 0,
        total: 0.0,
        commission: 0.0,
        active: 0,
        salescategory: '',
      },
    ],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReportPartnerComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'inicio', component: HomeComponent}
        ]),
        AppMaterialModule,
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
      providers: [{ provide: SocialAuthService, useValue: { ...socialAuthServiceMock, authState: new Observable() } },{ provide: LinksService, useValue: mockLinksService }],
    }).compileComponents();
    mockLinksService.getBussinessPartnerKPI.and.returnValue(of(kpi));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportPartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('export kpi', () => {
    component.exportOrderNotFinish();
    expect(mockLinksService.getBussinessPartnerKPI).toHaveBeenCalled();
  });

  it('get date', () => {
    const e: DataRangeInterface = {
      startDate: '2021-12-13',
      endDate: '2021-12-20',
    };
    component.getDate(e);
    expect(mockLinksService.getBussinessPartnerKPI).toHaveBeenCalled();
  });
});
