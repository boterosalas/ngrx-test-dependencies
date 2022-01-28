import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { of } from 'rxjs';
import { LinksService } from 'src/app/services/links.service';

import { DownloadCenterComponent } from './download-center.component';

describe('DownloadCenterComponent', () => {
  let component: DownloadCenterComponent;
  let fixture: ComponentFixture<DownloadCenterComponent>;

  const getreport = {
    total: 1,
    reports: [
      {
        id: 1,
        userid: 220,
        date: '27/01/2022 00:00:00',
        description: 'Reporte de Usuarios',
        link: 'https://webclickamqa.blob.core.windows.net/files-excel/usuarios/20211108001612_Usuarios.xlsx',
      },
    ],
  };

  let mockLinksService = jasmine.createSpyObj('LinksService', ['getReport']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DownloadCenterComponent],
      imports: [TranslateModule.forRoot(), NgxPaginationModule, HttpClientTestingModule],
      providers: [{ provide: LinksService, useValue: mockLinksService }],
    }).compileComponents();
    mockLinksService.getReport.and.returnValue(of(getreport));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('pagination', () => {
    const paginate = {}
    component.pagination(paginate);
    expect(paginate).toBeDefined();
  });
  

});
