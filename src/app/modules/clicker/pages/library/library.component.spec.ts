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
import { ShareModule } from "@ngx-share/core";
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { JwtModule } from "@auth0/angular-jwt";
import { AppMaterialModule } from "src/app/modules/shared/app-material/app-material.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

describe('LibraryComponent', () => {
    let component: LibraryComponent;
    let fixture: ComponentFixture<LibraryComponent>;
    const mockDialog = jasmine.createSpyObj("MatDialog", ["open", "closeAll"]);
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
            providers: [
                { provide: MatDialog, useValue: mockDialog }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LibraryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should set step ', () => {
        component.setStep(2);
        expect(component.step).toBe(2);
        component.returnAcordeon();
        expect(component.visible_step_mobile).toBeFalsy();
        component.setStepMovil("Datos");
        expect(component.visible_step_mobile).toBeTruthy();
        component.viewerPhoto();
        expect(mockDialog.open).toHaveBeenCalled();
    });
});
