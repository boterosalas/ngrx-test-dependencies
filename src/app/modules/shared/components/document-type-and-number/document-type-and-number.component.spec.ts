import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentTypeAndNumberComponent } from './document-type-and-number.component';

describe('DocumentTypeAndNumberComponent', () => {
  let component: DocumentTypeAndNumberComponent;
  let fixture: ComponentFixture<DocumentTypeAndNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentTypeAndNumberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentTypeAndNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
