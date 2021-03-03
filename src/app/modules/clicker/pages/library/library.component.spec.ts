import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryComponent } from './library.component';
import { SharedModule } from "src/app/modules/shared/shared.module";
import { TranslateModule } from "@ngx-translate/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
    MatFormFieldModule,
    MatDialogRef,
    MAT_BOTTOM_SHEET_DATA,
    MatDialog,
} from "@angular/material";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ShareModule } from "@ngx-share/core";
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { JwtModule } from "@auth0/angular-jwt";
import { AppMaterialModule } from "src/app/modules/shared/app-material/app-material.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { of } from 'rxjs';

describe('LibraryComponent', () => {
    let component: LibraryComponent;
    let fixture: ComponentFixture<LibraryComponent>;
    const mockDialog = jasmine.createSpyObj("MatDialog", ["open", "closeAll"]);
    const mockContentService = jasmine.createSpyObj("ContentService", [
        "getVideosImage", "setContentImgVi", "getBusiness"
    ]);
    const audit = {
        state: "success",
        userMessage: "se ha enviado un correo",
        objectResponse: [{
        }]
    };
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LibraryComponent],
            imports: [
                SharedModule,
                TranslateModule.forRoot(),
                FormsModule,
                ReactiveFormsModule,
                MatFormFieldModule,
                ShareModule,
                AppMaterialModule,
                RouterTestingModule,
                HttpClientTestingModule,
                BrowserAnimationsModule,
                JwtModule.forRoot({
                    config: {
                        tokenGetter: () => {
                            return localStorage.getItem("ACCESS_TOKEN");
                        },
                        throwNoTokenError: true,
                        whitelistedDomains: [],
                        blacklistedRoutes: [],
                    },
                }),
            ],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                { provide: MatDialog, useValue: mockDialog }
            ]
        })
            .compileComponents();
        mockContentService.getVideosImage.and.returnValue(of(audit));
        mockContentService.getBusiness.and.returnValue(of(audit));

    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LibraryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        component.dataReal = [{ dataR: true }, { dataR: false }]
        component.dataRealVideo = [{ dataR: true }, { dataR: false }]
        component.loadDelete();
        expect(component.active).toBeFalsy()
    });
    it('should set step ', () => {
        component.setStep(2, { id: 1 });
        expect(component.step).toBe(2);
        component.returnAcordeon();
        expect(component.visible_step_mobile).toBeFalsy();
        component.setStepMovil("Datos", { id: 1 });
        expect(component.visible_step_mobile).toBeTruthy();
        component.viewerPhoto({ id: 1, url: "http:example.jpg" });
        expect(mockDialog.open).toHaveBeenCalled();
    });
    it('add test', () => {
        component.dataReal = [{ id: 1, dataR: true }, { id: 2, dataR: false }]
        component.dataRealVideo = [{ id: 1, dataR: true }, { id: 2, dataR: false }]
        component.selectAll();
        //component.downloadFiles();
        expect(component.active).toBeFalsy()

    })
});
