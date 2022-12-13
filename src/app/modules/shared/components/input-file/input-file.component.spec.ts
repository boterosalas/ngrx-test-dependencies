import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputFileComponent } from './input-file.component';

describe('InputFileComponent', () => {
  let component: InputFileComponent;
  let fixture: ComponentFixture<InputFileComponent>;

  const event = {
    target: {
      files: [
        {
          name: 'imageFile.jpg',
          size: 250000
        }
      ]
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputFileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should upload Image', () => {
    component.uploadFileImage(event);
  })
});
