import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogStoriesComponent } from './dialog-stories.component';
import { AppMaterialModule } from '../../app-material/app-material.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs/internal/observable/of';
import { SlickCarouselModule } from 'ngx-slick-carousel';

describe('DialogStoriesComponent', () => {
  let component: DialogStoriesComponent;
  let fixture: ComponentFixture<DialogStoriesComponent>;

  const mockDialog = jasmine.createSpyObj('MatDialog', ['open']);

  const dialogMock = {
    close: () => {},
  };

  let data = {
    stories: [
      {
        id: 0,
        idbusiness: 2,
        name: 'descripcion',
        businessName: 'Exito',
        infoAditional: '50%',
        image: 'http/archivo.jpg',
        businessImage: 'http/archivo.jpg',
        businessCode: 'exito',
        link: 'https://www.exito.com/story',
        date: new Date(2021, 4, 12),
        stateView: true,
        pause: false,
      },
      {
        id: 1,
        idbusiness: 2,
        name: 'descripcion',
        businessName: 'Exito',
        infoAditional: '50%',
        image: 'http/archivo.jpg',
        businessImage: 'http/archivo.jpg',
        businessCode: 'exito',
        link: 'https://www.exito.com/story',
        date: new Date(2021, 4, 12),
        stateView: true,
        pause: true,
      },
    ],
    id: 1,
    showArrows: true,
    userId: '20',
    showCarousel: true,
  };

  let stories = [
    {
      id: 0,
      idbusiness: 2,
      name: 'descripcion',
      businessName: 'Exito',
      infoAditional: '50%',
      image: 'http/archivo.jpg',
      businessImage: 'http/archivo.jpg',
      businessCode: 'exito',
      link: 'https://www.exito.com/story',
      date: new Date(2021, 4, 12),
      stateView: true,
      pause: true,
    },
    {
      id: 1,
      idbusiness: 2,
      name: 'descripcion',
      businessName: 'Exito',
      infoAditional: '50%',
      image: 'http/archivo.jpg',
      businessImage: 'http/archivo.jpg',
      businessCode: 'exito',
      link: 'https://www.exito.com/story',
      date: new Date(2021, 4, 12),
      stateView: true,
      pause: false,
    },
  ];

beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DialogStoriesComponent],
      imports: [AppMaterialModule, SlickCarouselModule],
      providers: [
        { provide: MatDialogRef, useValue: dialogMock },
        { provide: MAT_DIALOG_DATA, useValue: data },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogStoriesComponent);
    component = fixture.componentInstance;
    component.showArrowLeft = true;
    component.showArrowRight = true;
    component.nextEnabled = true;
    component.data = data;
    component.data.userId = '20';
    component.data.stories = stories;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('next', () => {
    component.next();
    expect(component.next).toBeTruthy();
  });

  it('prev', () => {
    component.prev();
    expect(component.prev).toBeTruthy();
  });

  it('events clicks arrows', () => {
    const arrowNext = document.getElementById('arrow-next');
    arrowNext.dispatchEvent(new Event('pointerdown'));
    expect(component.pause).toBeTruthy();

    arrowNext.dispatchEvent(new Event('onpointerup'));
    expect(component.reproduce).toBeTruthy();

    const arrowPrev = document.getElementById('arrow-prev');
    arrowPrev.dispatchEvent(new Event('onpointerup'));
    expect(component.reproduce).toBeTruthy();
  });

  it('close', () => {
    let spy = spyOn(component.dialogRef, 'close').and.callThrough();
    component.onNoClick();
    expect(spy).toHaveBeenCalled();
  });
});
