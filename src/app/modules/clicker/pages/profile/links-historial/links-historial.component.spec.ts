import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinksHistorialComponent } from './links-historial.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('LinksHistorialComponent', () => {
  let component: LinksHistorialComponent;
  let fixture: ComponentFixture<LinksHistorialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinksHistorialComponent ],
      imports:[
        SharedModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinksHistorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
