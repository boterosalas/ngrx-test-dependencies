import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SliderStoriesComponent } from './slider-stories.component';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { TranslateModule } from "@ngx-translate/core";
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BehaviorSubject, Subscription, of } from 'rxjs';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { JwtModule } from "@auth0/angular-jwt";
import { ContentService } from "src/app/services/content.service";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { UserService } from "src/app/services/user.service";
import { AnonymousModule } from 'src/app/modules/anonymous/anonymous.module';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { HomeComponent } from 'src/app/modules/anonymous/pages/home/home.component';

class MockUserService extends UserService {

  userInfo$ = new BehaviorSubject<any>({
    userId: '220',
    identification: '1223345',
    verified: true
  });
  
}

describe('SliderStoriesComponent', () => {
    let component: SliderStoriesComponent;
    let fixture: ComponentFixture<SliderStoriesComponent>;

    const mockDialog = jasmine.createSpyObj("MatDialog", ["open", "closeAll"]);

    const mockContentService = jasmine.createSpyObj("ContentService", [
        "getBusiness", "getStories"
    ]);

    // const mockUserService = jasmine.createSpyObj("UserService", [
    //   "getProfile"
    // ]);

    let getStories = {
      state: "Success",
      userMessage: null,
      objectResponse: [{
        id: 0,
        idbusiness: 25,
        name: "Exito",
        businessName: "Exito",
        infoAditional: "30%",
        image: "https://www.exito.com/story.jpg",
        businessImage: "https://www.exito.com/businessimagestory.jpg",
        businessCode: "exito",
        link: "https://www.exito.com/story",
        date: new Date(2021,4,12),
        stateView: false,
        pause: true
      }]
    };

      let bussiness = [
        {
          id: 25,
          orderby: 26,
          link:
            "https://www.exito.com/ferreteria?utm_source=clickam&utm_medium=referral&utm_campaign=",
          imageurl:
            "https://webclickamdev.blob.core.windows.net/img-ofertas/pic-content/ferreteria-vehiculos.png",
          description: "Ferreteria y vehiculos",
          commission: 0,
          idbusiness: 1,
          infoaditional: "",
        },
      ];
  
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ SliderStoriesComponent, HomeComponent ],
        imports: [
            SharedModule,
            TranslateModule.forRoot(),
            AppMaterialModule,
            HttpClientTestingModule,
            BrowserAnimationsModule,
            RouterTestingModule.withRoutes([
              { path: 'inicio', component: HomeComponent},
           ]),
            JwtModule.forRoot({
                config: {
                    tokenGetter: () => {
                    return localStorage.getItem('ACCESS_TOKEN');
                    },
                    throwNoTokenError: true,
                    whitelistedDomains: [],
                    blacklistedRoutes: []
                }
            })
        ],
        providers: [
          { provide: ContentService, useValue: mockContentService },
          { provide: MatDialog, useValue: mockDialog },
          { provide: UserService, useClass: MockUserService }
         ],
         schemas: [
            NO_ERRORS_SCHEMA
        ]
      })
      .compileComponents();
      mockContentService.getBusiness.and.returnValue(of(bussiness));
      mockContentService.getStories.and.returnValue(of(getStories));
      // mockUserService.getProfile
    }));
  
    beforeEach(() => {
        fixture = TestBed.createComponent(SliderStoriesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
  
    it('should create', () => {
      // let service = fixture.debugElement.injector.get(ContentService);
      // spyOn(service, 'getBusiness').and.returnValue(of(bussiness));
      // spyOn(service, 'getStories').and.returnValue(of(getStories));
      //component.bussiness = bussiness
      expect(component).toBeTruthy();
      // component.getBusiness();
      // expect(service.getBusiness).toHaveBeenCalled();
      // expect(service.getStories).toHaveBeenCalled();
      //expect(mockContentService.getStories).toHaveBeenCalled();
    });
  
    it("get business", () => {
      component.getBusiness();
      expect(mockContentService.getBusiness).toHaveBeenCalled();
    });

    it("get stories", () => {
      component.getStories();
      expect(mockContentService.getStories).toHaveBeenCalled();
    });

    it('open dialog stories', () => {
        component.openDialogStories();
        expect(mockDialog.open).toHaveBeenCalled();
      });
  });