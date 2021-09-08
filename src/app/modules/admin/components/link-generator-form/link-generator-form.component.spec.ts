import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkGeneratorFormComponent } from './link-generator-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('LinkGeneratorFormComponent', () => {
  let component: LinkGeneratorFormComponent;
  let fixture: ComponentFixture<LinkGeneratorFormComponent>;

beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LinkGeneratorFormComponent],
      imports: [ReactiveFormsModule, FormsModule, TranslateModule.forRoot(), AppMaterialModule, NoopAnimationsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkGeneratorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('generate link', () => {
    spyOn(component.generate, 'emit');
    component.generateLink();
    expect(component.generate.emit).toHaveBeenCalled();
  });

  it('copyInputMessage', () => {
    const button = document.querySelector('#btnCopy');
    button.dispatchEvent(new Event('click'));
    const nativeElementInput = fixture.nativeElement;
    const input = nativeElementInput.querySelector('input');
    expect(input).not.toBeUndefined();
  });
});
