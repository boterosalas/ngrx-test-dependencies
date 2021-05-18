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

    const saveVisitStories = {
        state: "Success",
        userMessage: "guardado",
        objectResponse: null
    };
  
    const data = {
        stories: [{
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
          state: true,
          pause: true
        }],
        id: 1,
        showArrows: false,
        userId: "20",
        showCarousel: false
    }
  
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ DialogStoriesComponent ],
        imports: [
            AppMaterialModule,
            SlickCarouselModule
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
        //component.data = data
        fixture.detectChanges();
    });
  
    it('should create', () => {
      expect(component).toBeTruthy();
      // let spy = spyOn(component.dialogRef, 'close').and.callThrough();
      // component.onNoClick();
      // expect(spy).toHaveBeenCalled();
    });
  
    // it("save visit stories", () => {
    //   component.saveVisitStories(0);
    //   expect(mockContentService.saveLink).toHaveBeenCalled();
    // });

    // it("next or close", () => {
    //     component.nextOrClose(0);
    //     expect(component.next()).toHaveBeenCalled();
    // });
  });