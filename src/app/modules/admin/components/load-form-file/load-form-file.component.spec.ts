import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadFormFileComponent } from './load-form-file.component';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('LoadFormFileComponent', () => {
  let component: LoadFormFileComponent;
  let fixture: ComponentFixture<LoadFormFileComponent>;
  const formBuilder: FormBuilder = new FormBuilder();

beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LoadFormFileComponent],
      imports: [ReactiveFormsModule, FormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{ provide: FormBuilder, useValue: formBuilder }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadFormFileComponent);
    component = fixture.componentInstance;
    component.fileForm = formBuilder.group({
      file: [null],
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('reset form', () => {
    component.reset();
    expect(component.fileForm.valid).toBeTruthy();
  });

  it('file change', () => {
    spyOn(component.uploadFile, 'emit');
    const nativeElement = fixture.nativeElement;
    const button = nativeElement.querySelector('input');
    button.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(component.uploadFile.emit).toHaveBeenCalled();
  });
});
