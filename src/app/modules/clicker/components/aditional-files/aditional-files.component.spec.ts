import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AditionalFilesComponent } from './aditional-files.component';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';

describe('AditionalFilesComponent', () => {
  let component: AditionalFilesComponent;
  let fixture: ComponentFixture<AditionalFilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AditionalFilesComponent ],
      imports: [
        TranslateModule.forRoot(),
        ReactiveFormsModule,
        FormsModule,
        AppMaterialModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AditionalFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
