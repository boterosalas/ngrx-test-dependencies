import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BussinessCardComponent } from './bussiness-card.component';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';

describe('BussinessCardComponent', () => {
  let component: BussinessCardComponent;
  let fixture: ComponentFixture<BussinessCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BussinessCardComponent ],
      imports:[
        AppMaterialModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BussinessCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('navigate bussiness', () => {
    spyOn(component.bussiness, 'emit');
     component.navigateBussiness();
     expect(component.bussiness.emit).toHaveBeenCalled();
  });
  

});
