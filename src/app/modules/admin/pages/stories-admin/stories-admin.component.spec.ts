import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoriesAdminComponent } from './stories-admin.component';
import { TranslateModule } from "@ngx-translate/core";
import { AppMaterialModule } from "src/app/modules/shared/app-material/app-material.module";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { JwtModule } from "@auth0/angular-jwt";
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { MatDialog } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import Swal from 'sweetalert2';
import { ContentService } from 'src/app/services/content.service';
import { UserService } from "src/app/services/user.service";
import { of, BehaviorSubject } from 'rxjs';
class MockUserService extends UserService {

    userInfo$ = new BehaviorSubject<any>({
        userId: '220',
        identification: '1223345',
        verified: true
      });
  
  }

describe('StoriesAdminComponent', () => {
    let component: StoriesAdminComponent;
    let fixture: ComponentFixture<StoriesAdminComponent>;

    const mockDialog = jasmine.createSpyObj("MatDialog", ["open", "closeAll"]);

    const mockContentService = jasmine.createSpyObj("ContentService", [
        "getBusiness", "getStories", "deleteContent"
    ]);

    const audit = {
        state: "success",
        userMessage: "se ha enviado un correo",
        objectResponse: [{
        }]
    };

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
            declarations: [StoriesAdminComponent],
            imports: [
                TranslateModule.forRoot(),
                SharedModule,
                AppMaterialModule,
                ReactiveFormsModule,
                FormsModule,
                HttpClientTestingModule,
                RouterTestingModule,
                BrowserAnimationsModule,
                JwtModule.forRoot({
                config: {
                    tokenGetter: () => {
                    return localStorage.getItem("ACCESS_TOKEN");
                    },
                    throwNoTokenError: true,
                    whitelistedDomains: [],
                    blacklistedRoutes: []
                }
                })
            ],

            schemas: [
                NO_ERRORS_SCHEMA
            ],
            providers: [
                { provide: MatDialog, useValue: mockDialog },
                { provide: ContentService, useValue: mockContentService },
                { provide: UserService, useClass: MockUserService },
            ]
        })
            .compileComponents();
        mockContentService.deleteContent.and.returnValue(of(audit));
        mockContentService.getStories.and.returnValue(of(getStories));
        mockContentService.getBusiness.and.returnValue(of(bussiness));
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(StoriesAdminComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        //component.bussiness = bussiness
        expect(component).toBeTruthy();
        component.getBusiness();
        expect(mockContentService.getBusiness).toHaveBeenCalled();
        component.getStories();
        expect(mockContentService.getStories).toHaveBeenCalled();
        
        const mockFile = new File([""], "name.jpg", { type: "text/html" });
        const mockEvt = { target: { files: [mockFile] } };
        component.onFileChangeFiles(mockEvt);
        expect(component.onFileChangeFiles).not.toBeNull();
        spyOn(Swal, "fire").and.returnValue(
            Promise.resolve<any>({
                text: "Extensión erronea",
                type: "success",
                confirmButtonText: "Aceptar",
                confirmButtonClass: "accept-activation-alert-error",
            })
        );
        component.selectAll();
        component.deleteEvery();
        let datos = true;
        expect(datos).toBeTruthy();
    });



    // it('new file', () => {
    //     const mockFile = new File([""], "name.jpg", { type: "text/html" });
    //     const mockEvt = { target: { files: [mockFile] } };
    //     expect(mockEvt).toBeDefined();
    //     component.dataReal = [{ id: 1, dataR: true }, { id: 2, dataR: false }]
    //     component.selectAll();
    //     component.dataReal = [{ id: 1, dataR: true }, { id: 2, dataR: false }]
    //     component.selectAll();

    //     expect(component.active).toBeFalsy()

    //     component.cancelDelete();
    //     expect(mockDialog.closeAll).toHaveBeenCalled();
    //     component.dataReal = [{ id: 1, dataR: true }, { id: 2, dataR: false }]
    //     expect(mockContentService.deleteContent).toHaveBeenCalled();
    // })
});
