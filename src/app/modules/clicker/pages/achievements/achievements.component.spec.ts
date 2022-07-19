import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { AchievementsComponent } from './achievements.component';
import { TranslateModule } from '@ngx-translate/core';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { AnonymousModule } from 'src/app/modules/anonymous/anonymous.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { ClickerModule } from '../../clicker.module';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { JwtModule } from '@auth0/angular-jwt';
import { LinksService } from 'src/app/services/links.service';
import { Observable, of } from 'rxjs';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { HomeComponent } from 'src/app/modules/anonymous/pages/home/home.component';

describe('AchievementsComponent', () => {
  let component: AchievementsComponent;
  let fixture: ComponentFixture<AchievementsComponent>;

  const mockLinksService = jasmine.createSpyObj('LinksService', ['getMedals']);
  let socialAuthServiceMock = jasmine.createSpyObj('socialAuthService', ['authState', 'initState', 'refreshAuthToken', 'signIn', 'signOut']);

  let medals = [
    {
      classLevel: 'bronze',
      percent: 35,
      icon: '/assets/img/gamification/Icon-perfil-completo.svg',
      level: 'Bronce',
      title: 'Perfil Completo',
      nextLevel: 'Oro',
      titleMission: 'Completar tu perfil al 100%',
      banner: '/assets/img/gamification/banner-perfil-completo-pc.jpg',
      class: 'perfil-completo',
      missionDescription:
        'Así podamos hacer los pagos de forma correcta y podamos compartir contigo los productos y servicios mas afines a ti y así puedas ganar más dinero.',
      detail: [
        {
          icon: '/assets/img/gamification/Icon-cuenta.svg',
          title: 'Cuenta',
          description: 'Completa la información básica de tu cuenta',
          complete: true,
          progress: 5,
          totalProgress: 5,
        },
        {
          icon: '/assets/img/gamification/icon-informacion-bancaria.svg',
          title: 'Información Bancaria',
          description: 'Completa los datos bancarios para consignar tu recompensa',
          complete: false,
          progress: 0,
          totalProgress: 9,
        },
        {
          icon: '/assets/img/gamification/icon-informacion-adicional.svg',
          title: 'Información Adicional',
          description: 'Completa esta información para el funcionamiento de tu cuenta',
          complete: false,
          progress: 4,
          totalProgress: 12,
        },
      ],
    },
  ];

beforeEach(async() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        TranslateModule.forRoot(),
        AppMaterialModule,
        SharedModule,
        ClickerModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'inicio', component: HomeComponent}
        ]),
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
    mockLinksService.getMedals.and.returnValue(of(medals));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AchievementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(mockLinksService.getMedals).toHaveBeenCalled();
  });
});
