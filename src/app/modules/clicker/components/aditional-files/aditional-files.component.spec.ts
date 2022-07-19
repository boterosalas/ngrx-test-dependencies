//Check for testing in cloud
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { AditionalFilesComponent } from './aditional-files.component';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { TruncatePipe } from 'src/app/pipes/truncate.pipe';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtModule } from '@auth0/angular-jwt';
import { HomeComponent } from 'src/app/modules/anonymous/pages/home/home.component';

describe('AditionalFilesComponent', () => {
  let component: AditionalFilesComponent;
  let fixture: ComponentFixture<AditionalFilesComponent>;

beforeEach(async() => {
    TestBed.configureTestingModule({
      declarations: [AditionalFilesComponent, TruncatePipe],
      imports: [
        TranslateModule.forRoot(),
        ReactiveFormsModule,
        FormsModule,
        AppMaterialModule,
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
    }).compileComponents();
  });

  beforeEach(() => {
    localStorage.setItem(
      'ACCESS_TOKEN',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiZGF2aWQuYmV0YW5jdXJAcHJhZ21hLmNvbS5jbyIsInVzZXJOYW1lIjoiZGF2aWQuYmV0YW5jdXJAcHJhZ21hLmNvbS5jbyIsInJvbGUiOiJDTElDS0VSIiwiZXhwIjoxNTcxODY2MDgwLCJpc3MiOiJwcmFjdGluY2FuZXRjb3JlLmNvbSIsImF1ZCI6IkVzdHVkaWFudGVzIn0.UJahw9VBALxwYizSTppjGJYnr618EKlaFW-d3YLugnU'
    );
    fixture = TestBed.createComponent(AditionalFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  //it('should get extension',()=>{
  //  component.getExtension("reporte.pdf")
  //})

  it('on file change ced1', () => {
    const mockFile = new File([''], 'name.jpg', { type: 'text/html' });
    const mockEvt = { target: { files: [mockFile] } };
    component.onFileChangeFiles(mockEvt, 'cedula1');
    expect(component.onFileChangeFiles).not.toBeNull();
  });

  it('on file change ced2', () => {
    const mockFile = new File([''], 'name.jpg', { type: 'text/html' });
    const mockEvt = { target: { files: [mockFile] } };
    component.onFileChangeFiles(mockEvt, 'cedula2');
    expect(component.onFileChangeFiles).not.toBeNull();
  });

  it('on file change cert', () => {
    const mockFile = new File([''], 'name.pdf', { type: 'text/html' });
    const mockEvt = { target: { files: [mockFile] } };
    component.onFileChangeFiles(mockEvt, 'certificado');
    expect(component.onFileChangeFiles).not.toBeNull();
  });

  it('reset form', () => {
    spyOn(component.resetFormEmit, 'emit');
    component.resetForm();
    expect(component.resetFormEmit.emit).toHaveBeenCalled;
  });

  it('sendInfo', () => {
    spyOn(component.uploadFile, 'emit');
    component.sendInfo();
    expect(component.uploadFile.emit).toHaveBeenCalled();
  });

  it('Test', () => {
    const test = true;
    expect(test).toBeTruthy();
  });

  afterAll(() => {
    TestBed.resetTestingModule();
  });


});
