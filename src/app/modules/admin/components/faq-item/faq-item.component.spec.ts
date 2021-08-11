import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { AdminModule } from '../../admin.module';

import { FaqItemComponent } from './faq-item.component';

describe('FaqItemComponent', () => {
  let component: FaqItemComponent;
  let fixture: ComponentFixture<FaqItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FaqItemComponent],
      imports: [
        HttpClientTestingModule,
        TranslateModule.forRoot({}),
        BrowserAnimationsModule,
        AppMaterialModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqItemComponent);
    component = fixture.componentInstance;
    component.faq = {
      id: 4,
      idseccion: 1,
      link: 'https://www.google.com.co',
      sectiontitle: '¿Tienes un sitio web? Regístralo Aqui!',
      orderby: 1,
      date: '2021-05-25T09:16:06.897',
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
