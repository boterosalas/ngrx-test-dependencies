import { CdkDrag, CdkDragDrop, DragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { ContentService } from 'src/app/services/content.service';

import { TableOnboardingComponent } from './table-onboarding.component';

describe('TableOnboardingComponent', () => {
  let component: TableOnboardingComponent;
  let fixture: ComponentFixture<TableOnboardingComponent>;

  const mockContentService = jasmine.createSpyObj('ContentService', [
    'saveOrderBoarding',
  ]);

  const resp = {
    state: 'Success',
    userMessage: '',
    objectResponse: [],
  };


  const onboarding = [
    {
      imageweb: 'https://dummyimage.com/600x400/000/fff.jpg',
      imagemobile: 'https://dummyimage.com/300x300/000/fff.jpg',
      linkname1: 'https://wwww.google.com',
      buttonname1: 'Siguiente',
      buttonname2: 'Atras',
      linkname2: 'https://wwww.google.com',
      id: 1
    },
    {
      imageweb: 'https://dummyimage.com/600x400/000/fff.jpg',
      imagemobile: 'https://dummyimage.com/300x300/000/fff.jpg',
      linkname1: 'https://wwww.google.com',
      buttonname1: 'Siguiente',
      buttonname2: 'Atras',
      linkname2: 'https://wwww.google.com',
      id: 2
    }
  ];

  const order = [
    { id: 1, orderby: 1 },
    { id: 2, orderby: 2 },
    { id: 3, orderby: 3 },
    { id: 4, orderby: 4 }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TableOnboardingComponent],
      imports: [
        AppMaterialModule,
        DragDropModule,
        HttpClientTestingModule,
        DragDropModule
      ],
      providers: [
        { provide: ContentService, useValue: mockContentService },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableOnboardingComponent);
    component = fixture.componentInstance;
    component.dataSource = onboarding;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deleteItem', () => {
    spyOn(component.dataOnboardingDelete, 'emit');
    component.deleteItem(onboarding);
    expect(component.dataOnboardingDelete.emit).toHaveBeenCalled();
  });

  it('editItem', () => {
    spyOn(component.dataOnboardingEdit, 'emit');
    component.editItem(onboarding);
    expect(component.dataOnboardingEdit.emit).toHaveBeenCalled();
  });

  it('openmodal', () => {
    spyOn(component.openBoard, 'emit');
    component.openModalBoard();
    expect(component.openBoard.emit).toHaveBeenCalled();
  });

  it('drop item', () => {
    const event: any = {
      item: {
        onboarding
      },
      currentIndex: 1,
      previousIndex: 0
    };

    mockContentService.saveOrderBoarding.and.returnValue(of(resp));
    component.dropTable(event);
    expect( mockContentService.saveOrderBoarding).toHaveBeenCalled();
  });

});
