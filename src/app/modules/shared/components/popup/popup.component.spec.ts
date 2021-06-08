import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { PopupComponent } from './popup.component';

describe('PopupComponent', () => {
  let component: PopupComponent;
  let fixture: ComponentFixture<PopupComponent>;

  const dialogMock = {
    close: () => { }
  };

  const data = { 
    element: {
      imageUrlWeb: "http/archivo.jpg", 
      imageUrlMobile: "http/archivo.jpg", 
      BLink: "http/archivo.jpg",
      colorbutton: "#000",
      textbutton: "Pendiente" 
    } 
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupComponent ],
      imports: [
        AppMaterialModule
      ],
      providers: [{ provide: MAT_DIALOG_DATA, useValue: data }, { provide: MatDialogRef, useValue: dialogMock }],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
