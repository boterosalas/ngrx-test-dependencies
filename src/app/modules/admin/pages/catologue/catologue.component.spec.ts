import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtModule } from '@auth0/angular-jwt';
import { of } from 'rxjs';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';

import { CatologueComponent } from './catologue.component';

export class MatDialogMock {
  open() {
    return {
      afterClosed: () => of(true),
    };
  }
}

describe('CatologueComponent', () => {
  let component: CatologueComponent;
  let fixture: ComponentFixture<CatologueComponent>;

  const matDialog = new MatDialogMock();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        CatologueComponent,
      ],
      imports:[
         HttpClientTestingModule,
         RouterTestingModule,
         AppMaterialModule,
         JwtModule.forRoot({
          config: {
            tokenGetter: () => {
              return localStorage.getItem('ACCESS_TOKEN');
            },
            throwNoTokenError: true,
            allowedDomains: [],
            disallowedRoutes: [],
          },
        }),
       ],
      providers: [
        { provide: MatDialogRef, useValue: MatDialogMock },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialog, useValue: matDialog },
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatologueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
