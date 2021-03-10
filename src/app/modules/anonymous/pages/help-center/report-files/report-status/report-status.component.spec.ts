import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from "@ngx-translate/core";
import { AppMaterialModule } from "src/app/modules/shared/app-material/app-material.module";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { JwtModule } from "@auth0/angular-jwt";
import { NgxDaterangepickerMd, LocaleService, LOCALE_CONFIG } from 'ngx-daterangepicker-material';
import { MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { ReportStatusComponent } from './report-status.component';
import { UserService } from 'src/app/services/user.service';
import { of } from "rxjs/internal/observable/of";
import Swal from 'sweetalert2';

describe('ReportStatusComponent', () => {
    let component: ReportStatusComponent;
    let fixture: ComponentFixture<ReportStatusComponent>;
    const mockContentService = jasmine.createSpyObj("UserService", [
        "saveNews"
    ]);
    const resp = {
        state: "Success"
    }
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ReportStatusComponent],
            imports: [
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
                TranslateModule.forRoot({}),
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
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                { provide: UserService, useValue: mockContentService },
            ]
        })
            .compileComponents();
        mockContentService.saveNews.and.returnValue(of(resp));
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ReportStatusComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

});
