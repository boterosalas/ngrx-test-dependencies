import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { SlideTestimonyComponent } from './slide-testimony.component';

describe('SlideTestimonyComponent', () => {
  let component: SlideTestimonyComponent;
  let fixture: ComponentFixture<SlideTestimonyComponent>;

  const mockDialog = jasmine.createSpyObj('MatDialog', ['open', 'closeAll']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlideTestimonyComponent ],
      imports: [
        SlickCarouselModule
      ],
      providers: [
        { provide: MatDialog, useValue: mockDialog },
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideTestimonyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('open video', () => {
    const videoUrl = 'Na0OKqZLSm8';
    component.openVideo(videoUrl);
    expect(videoUrl).toBeDefined();
  });

});
