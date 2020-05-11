import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRefersComponent } from './my-refers.component';

describe('MyRefersComponent', () => {
  let component: MyRefersComponent;
  let fixture: ComponentFixture<MyRefersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyRefersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyRefersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
