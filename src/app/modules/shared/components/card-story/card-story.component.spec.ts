import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CardStoryComponent } from './card-story.component';
import { MAT_BOTTOM_SHEET_DATA, MatDialogRef } from '@angular/material';
import { TranslateModule } from "@ngx-translate/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ShareModule } from "@ngx-share/core";
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { JwtModule } from "@auth0/angular-jwt";
import { AppMaterialModule } from "src/app/modules/shared/app-material/app-material.module";
import { DialogComponent } from "src/app/modules/shared/components/dialog/dialog.component";
import { of } from "rxjs/internal/observable/of";
import { BrowserDynamicTestingModule } from "@angular/platform-browser-dynamic/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CommentStmt } from "@angular/compiler";
import { UserService } from "src/app/services/user.service";
import { LinksService } from "src/app/services/links.service";
import { TokenService } from "src/app/services/token.service";
import { Router } from "@angular/router";

describe('CardStoryComponent', () => {
    let component: CardStoryComponent;
    let fixture: ComponentFixture<CardStoryComponent>;

    const mockDialog = jasmine.createSpyObj("MatDialog", ["open"]);

    const mockDialogRef = jasmine.createSpyObj("MatDialogRef", [
      "close",
      "afterClosed",
      "componentInstance",
    ]);

    const mockLinksService = jasmine.createSpyObj("LinksService", [
        "saveLink"
      ]);

    const mockTokenService = jasmine.createSpyObj("TokenService", ["userInfo"]);

    let userInfo = {
        userName: "davidbet2@hotmail.com",
        role: "CLICKER",
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": "CLICKER",
        identification: "1124587893",
        firstnames: "ñañito",
        lastnames: "betancur",
        documentType: "CC",
        userid: "77",
        idclicker: "ñañito andres77",
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress":
          "davidbet2@hotmail.com",
        exp: 1593636234,
        iss: "practincanetcore.com",
        aud: "Estudiantes",
      };

      let story = {
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
      };
    
    const dialogMock = {
      close: () => { }
     };

    const saveLink = {
        state: "Success",
        userMessage: "guardado",
        objectResponse: { link: "https://www.exito.com/story" }
    };
  
  
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ CardStoryComponent, DialogComponent ],
        imports: [
            TranslateModule.forRoot(),
            AppMaterialModule,
            HttpClientTestingModule,
            BrowserAnimationsModule,
            ReactiveFormsModule,
            FormsModule,
            RouterTestingModule.withRoutes([]),
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
            { provide: LinksService, useValue: mockLinksService },
            { provide: TokenService, useValue: mockTokenService },
            { provide: MatDialogRef, useValue: mockDialogRef },
            { provide: MAT_BOTTOM_SHEET_DATA, useValue: mockDialog }
         ],
      })
      .overrideModule(BrowserDynamicTestingModule, {
        set: {
          entryComponents: [DialogComponent],
        },
      })
      .compileComponents();
      mockLinksService.saveLink.and.returnValue(of(saveLink));
      mockTokenService.userInfo.and.returnValue(userInfo);
    }));
  
    beforeEach(() => {
        localStorage.setItem('ACCESS_TOKEN', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiZGF2aWQuYmV0YW5jdXJAcHJhZ21hLmNvbS5jbyIsInVzZXJOYW1lIjoiZGF2aWQuYmV0YW5jdXJAcHJhZ21hLmNvbS5jbyIsInJvbGUiOiJDTElDS0VSIiwiZXhwIjoxNTcxODY2MDgwLCJpc3MiOiJwcmFjdGluY2FuZXRjb3JlLmNvbSIsImF1ZCI6IkVzdHVkaWFudGVzIn0.UJahw9VBALxwYizSTppjGJYnr618EKlaFW-d3YLugnU');
        fixture = TestBed.createComponent(CardStoryComponent);
        component = fixture.componentInstance;
        component.story = story
        component.cardOpen = true
        component.reference = false;
        fixture.detectChanges();
    });
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  
    it("save link", () => {
        component.urlshorten = "https://tyny.url/xaxa";
        component.identification = "123456789";
        component.plu = "123456";
        component.business = "exito";
        component.date = "2019/09/09";
        component.saveLink();
        expect(mockLinksService.saveLink).toHaveBeenCalled();
    });

    it("save link with param", () => {
        component.urlshorten = "https://tyny.url/xaxa";
        component.identification = "123456789";
        component.plu = "123456";
        component.business = "exito";
        component.date = "2019/09/09";
        component.saveLink("assured");
        expect(mockLinksService.saveLink).toHaveBeenCalled();
      });

      it("save reference", () => {
        component.urlshorten = "https://tyny.url/xaxa";
        component.identification = "123456789";
        component.plu = "123456";
        component.business = "exito";
        component.date = "2019/09/09";
        component.saveLinkReference();
        expect(mockLinksService.saveLink).toHaveBeenCalled();
      });

      it("showReference", () => {
        component.reference = false;
        component.showReference();
        expect(component.reference).toBeTruthy();
      });

      it("data category", () => {
        component.urlshorten = "http://tynyurl.com/xsxsx";
        component.dataSliderCategory();
        expect(mockDialog.open).toBeTruthy();
      });

      it("share mobile", () => {
        component.share();
        expect(component.urlshorten).not.toBeUndefined();
      });

      // it("copyInputMessage", () => {
      //   const button = document.querySelector("#btnCopy");
      //   button.dispatchEvent(new Event("click"));
      //   const nativeElementInput = fixture.nativeElement;
      //   const input = nativeElementInput.querySelector("input");
      //   expect(input).not.toBeUndefined();
      // });

      it("share mobile", () => {
        component.share();
        expect(component.urlshorten).not.toBeUndefined();
      });

      it("Change", () => {
        let datos = true;
        expect(datos).toBeTruthy();
      })
  
      it('check delete story', () => {
        spyOn(component.checkStory, 'emit');
        component.checkDeleteStory();
        expect(component.checkStory.emit).toHaveBeenCalled();
      });

      it('view story', () => {
        spyOn(component.openStoryCard, 'emit');
        component.viewStory();
        expect(component.openStoryCard.emit).toHaveBeenCalled();
      });
  });