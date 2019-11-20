import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AditionalFilesComponent } from './aditional-files.component';

describe('AditionalFilesComponent', () => {
  let component: AditionalFilesComponent;
  let fixture: ComponentFixture<AditionalFilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AditionalFilesComponent ]
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
