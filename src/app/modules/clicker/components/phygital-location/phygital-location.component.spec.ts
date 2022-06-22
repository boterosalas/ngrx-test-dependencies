import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ContentService } from 'src/app/services/content.service';

import { PhygitalLocationComponent } from './phygital-location.component';

export class MatDialogMock {
  open() {
    return {
      beforeClosed: () => of(true),
    };
  }
  closeAll() {
    return {
      closeAll: () => of(true),
    };
  }
}


describe('PhygitalLocationComponent', () => {

  const mockContentService = jasmine.createSpyObj('ContentService', ['getCities', 'getLocations']);

  const matDialog = new MatDialogMock();
  const dialogMock = {
    close: () => {},
  };

  const points = {
      Medellín: [
        {
          id: 1,
          adress: 'Poblado',
          city: 'Medellín',
          idbusiness: 70,
          description: 'Poblado',
        },
      ],
      Cartagena: [
        {
          id: 2,
          adress: 'Bocagrande',
          city: 'Cartagena',
          idbusiness: 70,
          description: 'Bocagrande',
        },
      ],
    };


  let component: PhygitalLocationComponent;
  let fixture: ComponentFixture<PhygitalLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PhygitalLocationComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialog, useValue: matDialog },
        { provide: MatDialogRef, useValue: dialogMock },
        { provide: ContentService, useValue: mockContentService },
      ],
    }).compileComponents();
    mockContentService.getCities.and.returnValue(of(points));
    mockContentService.getLocations.and.returnValue(of(points));
  });



  beforeEach(() => {
    fixture = TestBed.createComponent(PhygitalLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('get location', () => {
    component.getPoints(70, 'Medellín');
    expect(mockContentService.getLocations).toHaveBeenCalled()
  });
  

});
