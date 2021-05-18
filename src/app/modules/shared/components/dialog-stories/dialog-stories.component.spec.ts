import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogStoriesComponent } from './dialog-stories.component';
import { AppMaterialModule } from '../../app-material/app-material.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ContentService } from 'src/app/services/content.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from "rxjs/internal/observable/of";
import { SlickCarouselModule } from 'ngx-slick-carousel';

describe('DialogStoriesComponent', () => {
    let component: DialogStoriesComponent;
    let fixture: ComponentFixture<DialogStoriesComponent>;

    const mockDialog = jasmine.createSpyObj("MatDialog", ["open"]);

    const mockContentService = jasmine.createSpyObj("ContentService", [
        "saveVisitStories"
      ]);
    const dialogMock = {
      close: () => { }
     };

    let saveVisitStories = {
        state: "Success",
        userMessage: "guardado",
        objectResponse: null
    };
  
    let data = {
        stories: [{
          id: 0,
          idbusiness: 2,
          name: "descripcion",
          businessName: "Exito",
          infoAditional: "50%",
          image: "http/archivo.jpg",
          businessImage: "http/archivo.jpg",
          businessCode: "exito",
          link: "https://www.exito.com/story",
          date: new Date(2021,4,12),
          stateView: true,
          pause: false
        },
        {
          id: 1,
          idbusiness: 2,
          name: "descripcion",
          businessName: "Exito",
          infoAditional: "50%",
          image: "http/archivo.jpg",
          businessImage: "http/archivo.jpg",
          businessCode: "exito",
          link: "https://www.exito.com/story",
          date: new Date(2021,4,12),
          stateView: true,
          pause: true
        }],
        id: 1,
        showArrows: true,
        userId: "20",
        showCarousel: true
    }

    let stories = [{
      id: 0,
      idbusiness: 2,
      name: "descripcion",
      businessName: "Exito",
      infoAditional: "50%",
      image: "http/archivo.jpg",
      businessImage: "http/archivo.jpg",
      businessCode: "exito",
      link: "https://www.exito.com/story",
      date: new Date(2021,4,12),
      stateView: true,
      pause: true
    },
    {
      id: 1,
      idbusiness: 2,
      name: "descripcion",
      businessName: "Exito",
      infoAditional: "50%",
      image: "http/archivo.jpg",
      businessImage: "http/archivo.jpg",
      businessCode: "exito",
      link: "https://www.exito.com/story",
      date: new Date(2021,4,12),
      stateView: true,
      pause: false
    }]
  
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ DialogStoriesComponent ],
        imports: [
            AppMaterialModule,
            SlickCarouselModule,
        ],
        providers: [
          { provide: MatDialogRef, useValue: dialogMock },
            { provide: MAT_DIALOG_DATA, useValue: data },
          { provide: ContentService, useValue: mockContentService }
         ],
         schemas: [
            NO_ERRORS_SCHEMA
          ]
      })
      .compileComponents();
      mockContentService.saveVisitStories.and.returnValue(of(saveVisitStories));
    }));
  
    beforeEach(() => {
        fixture = TestBed.createComponent(DialogStoriesComponent);
        component = fixture.componentInstance;
        component.showArrowLeft = true
        component.showArrowRight = true
        component.nextEnabled = true
        component.data = data
        component.data.userId = "20"
        component.data.stories = stories
        fixture.detectChanges();
    });
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('next', () => {
      component.next();
      expect(component.next).toBeTruthy();
    })

    it('prev', () => {
      component.prev();
      expect(component.prev).toBeTruthy();
    })

    it("save visit stories", () => {
      component.data.stories[0].stateView = true
      component.saveVisitStories(0);
      expect(mockContentService.saveVisitStories).toHaveBeenCalled();
    });
  
    it("events clicks", () => {
      const button = document.getElementById("story-0");
      button.dispatchEvent(new Event("pointerdown"));
      expect(component.pause).toBeTruthy();
      button.dispatchEvent(new Event("onpointerup"));
      expect(component.reproduce).toBeTruthy();
    });

    it("events clicks arrows", () => {
      const arrowNext = document.getElementById("arrow-next");
      arrowNext.dispatchEvent(new Event("pointerdown"));
      expect(component.pause).toBeTruthy();

      arrowNext.dispatchEvent(new Event("onpointerup"));
      expect(component.reproduce).toBeTruthy();

      const arrowPrev = document.getElementById("arrow-prev");
      arrowPrev.dispatchEvent(new Event("onpointerup"));
      expect(component.reproduce).toBeTruthy();
    });

    // it("next or close", () => {
    //     component.nextOrClose(0);
    //     expect(component.next()).toHaveBeenCalled();
    // });

    it('close', () => {
      let spy = spyOn(component.dialogRef, 'close').and.callThrough();
      component.onNoClick();
      expect(spy).toHaveBeenCalled();
    })
  });