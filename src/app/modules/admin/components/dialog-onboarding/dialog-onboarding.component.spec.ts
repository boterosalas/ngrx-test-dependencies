import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { TruncatePipe } from 'src/app/pipes/truncate.pipe';
import { ContentService } from 'src/app/services/content.service';

import { DialogOnboardingComponent } from './dialog-onboarding.component';

describe('DialogOnboardingComponent', () => {
  let component: DialogOnboardingComponent;
  let fixture: ComponentFixture<DialogOnboardingComponent>;

  const mockContentService = jasmine.createSpyObj('ContentService', [
    'saveBoardings',
  ]);

  const data = {
    id: 1,
    imageweb: 'https://webclickamdev.blob.core.windows.net/img-ofertas/boarding/20210914184213_web.jpg',
    imagemobile: 'https://webclickamdev.blob.core.windows.net/img-ofertas/boarding/20210914184213_mobile.jpg',
    buttonname1: 'Botón 1',
    linkname1: 'https://www.google.com.co',
    linkname2: 'Botón 2',
    buttonname2: 'https://www.clickam.com.co',
    orderby: null,
    date: '2021-09-14T18:42:13.49',
    imageBase64Mobile: null,
    imageBase64Web: null
  };

  const resp = {
    state: 'Success',
    userMessage: '',
    objectResponse: [],
  };


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DialogOnboardingComponent, TruncatePipe],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        AppMaterialModule,
        HttpClientTestingModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: data },
        { provide: ContentService, useValue: mockContentService },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogOnboardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('on file change web', () => {
    const mockFile =  new File(
      [new Blob(['1'.repeat(1024 * 1024 + 1)], { type: 'image/jpg' })],
      'darthvader.jpg'
    );
    const mockEvt = { target: { files: [mockFile] } };
    component.onFileChangeFiles(mockEvt, 'web');
    expect(component.onFileChangeFiles).not.toBeNull();
  });

  it('on file change mobile', () => {
    const mockFile =  new File(
      [new Blob(['1'.repeat(1024 * 1024 + 1)], { type: 'image/jpg' })],
      'darthvader.jpg'
    );
    const mockEvt = { target: { files: [mockFile] } };
    component.onFileChangeFiles(mockEvt, 'mobile');
    expect(component.onFileChangeFiles).not.toBeNull();
  });

  it('on file change web empty', () => {
    const mockFile = new File([''], '', { type: 'text/html' });
    const mockEvt = { target: { files: [mockFile] } };
    component.onFileChangeFiles(mockEvt, 'web');
    expect(component.onFileChangeFiles).not.toBeNull();
  });

  it('on file change mobile empty', () => {
    const mockFile = new File([''], '', { type: 'text/html' });
    const mockEvt = { target: { files: [mockFile] } };
    component.onFileChangeFiles(mockEvt, 'mobile');
    expect(component.onFileChangeFiles).not.toBeNull();
  });

  it('save on board', () => {
    component.fileWeb = 'data:application/octet-stream;base64,12346';
    component.fileMobile = 'data:application/octet-stream;base64,12346';
    mockContentService.saveBoardings.and.returnValue(of(resp));
    component.saveOnboard();
    expect(mockContentService.saveBoardings).toHaveBeenCalled();
  });

  it('form board change name content and link empty', () => {
    component.onBoard.controls.namecta1.setValue('boton 1');
    component.onBoard.controls.linkcta1.setValue('');
    fixture.detectChanges();
    component.formBoardChange();
    expect(component.onBoard.invalid).toBeTruthy();
  });


});
