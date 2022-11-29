import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertaCargarDocumentosComponent } from './alerta-cargar-documentos.component';

describe('AlertaCargarDocumentosComponent', () => {
  let component: AlertaCargarDocumentosComponent;
  let fixture: ComponentFixture<AlertaCargarDocumentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertaCargarDocumentosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertaCargarDocumentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
