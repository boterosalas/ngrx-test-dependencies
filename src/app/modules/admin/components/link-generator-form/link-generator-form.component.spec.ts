import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkGeneratorFormComponent } from './link-generator-form.component';

describe('LinkGeneratorFormComponent', () => {
  let component: LinkGeneratorFormComponent;
  let fixture: ComponentFixture<LinkGeneratorFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkGeneratorFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkGeneratorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
