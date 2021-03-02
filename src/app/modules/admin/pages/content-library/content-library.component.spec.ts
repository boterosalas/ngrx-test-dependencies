import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentLibraryComponent } from './content-library.component';

import { TranslateModule } from "@ngx-translate/core";
import { AppMaterialModule } from "src/app/modules/shared/app-material/app-material.module";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { JwtModule } from "@auth0/angular-jwt";
import { NgxDaterangepickerMd, LocaleService, LOCALE_CONFIG } from 'ngx-daterangepicker-material';
import { MatDatepickerModule, MatDialog, MatNativeDateModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AnonymousModule } from 'src/app/modules/anonymous/anonymous.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import Swal from 'sweetalert2';
describe('ContentLibraryComponent', () => {
    let component: ContentLibraryComponent;
    let fixture: ComponentFixture<ContentLibraryComponent>;
    const mockDialog = jasmine.createSpyObj("MatDialog", ["open", "closeAll"]);
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ContentLibraryComponent],
            imports: [
                TranslateModule.forRoot(),
                AnonymousModule,
                AppMaterialModule,
                MatDatepickerModule,
                MatNativeDateModule,
                HttpClientTestingModule,
                ReactiveFormsModule,
                FormsModule,
                BrowserAnimationsModule,
                SharedModule,
                NgxDaterangepickerMd,
                RouterTestingModule.withRoutes([]),
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
                { provide: MatDialog, useValue: mockDialog }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ContentLibraryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        component.deleteEvery();
        let datos = true;
        expect(datos).toBeTruthy();
        component.loadDelete();
        expect(component.active).toBeFalsy();
        component.selectAll();
        expect(component.active).toBeTruthy();
        component.viewerPhoto();
        expect(mockDialog.open).toHaveBeenCalled();
        component.viewerVideo();
        expect(mockDialog.open).toHaveBeenCalled();
        spyOn(Swal, "fire").and.returnValue(
            Promise.resolve<any>({
                text: "Extensión erronea",
                type: "error",
                confirmButtonText: "Aceptar",
                confirmButtonClass: "accept-activation-alert-error",
            })
        );
        component.getExtension("archivo.jpg", 20000)
        expect(component.validFormat).toBeTruthy();
        component.getExtension("archivo.xls", 20000)
        expect(component.validFormat).toBeFalsy();
        component.getExtension("archivo.jpg", 20000000)
        expect(component.validFormat).toBeFalsy();
        component.getExtension("archivo.mp4", 80000000)
        expect(component.validFormat).toBeFalsy();
    });
});
