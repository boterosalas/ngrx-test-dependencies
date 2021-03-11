import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TableActivateBusinessComponent } from './table-activate-business.component';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { TranslateModule } from '@ngx-translate/core';
import { MatDialog, MatMenuModule, MatSlideToggleModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { LinksService } from "src/app/services/links.service";
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { ContentService } from 'src/app/services/content.service';
//import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop'

describe('TableActivateBusinessComponent', () => {
  let component: TableActivateBusinessComponent;
  let fixture: ComponentFixture<TableActivateBusinessComponent>;
  let mockRouter = {
    navigate: jasmine.createSpy('navigate')
  }
  const mockDialog = jasmine.createSpyObj("MatDialog", ["open", "closeAll", "afterAllClosed"]);
  let mockLinksService = jasmine.createSpyObj("LinksService", ["putOrder"]);
  let response = {
    Status: "Success"
  }
  const mockContentService = jasmine.createSpyObj("ContentService", [
    "getCommissionsData"
  ]);
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TableActivateBusinessComponent],
      imports: [
        AppMaterialModule,
        TranslateModule.forRoot(),
        MatSlideToggleModule,
        FormsModule,
        DragDropModule,
        HttpClientTestingModule,
        RouterTestingModule,
        MatMenuModule
      ],
      providers: [
        { provide: LinksService, useValue: mockLinksService },
        { provide: Router, useValue: mockRouter },
        { provide: MatDialog, useValue: mockDialog },
        { provide: ContentService, useValue: mockContentService },
      ],
    })
      .compileComponents();
    mockLinksService.putOrder.and.returnValue(of(response));
    mockContentService.getCommissionsData.and.returnValue(of(response));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableActivateBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should activated', () => {
    spyOn(component.activateBusiness, 'emit');
    component.activate([]);
    expect(component.activateBusiness.emit).toHaveBeenCalled();
  });
  it('should saveOrder', () => {

    let datosOrder = [{ idbusiness: 1, order: 10 },
    { idbusiness: 2, order: 9 },
    { idbusiness: 3, order: 8 },
    { idbusiness: 4, order: 7 },
    { idbusiness: 5, order: 6 },
    { idbusiness: 14, order: 5 },
    { idbusiness: 19, order: 4 },
    { idbusiness: 20, order: 3 },
    { idbusiness: 21, order: 2 },
    { idbusiness: 22, order: 1 }];
    component.saveOrder(datosOrder);
    expect(mockLinksService.putOrder).toHaveBeenCalled();
  });
  it('go to edit', () => {
    //spyOn(router, 'navigate');
    let bussiness = {
      id: 2,
      titulo: "Exito",
      imagen: ""
    }
    let datos = true;
    component.editCategory(bussiness);
    component.contentBussiness(bussiness);
    expect(datos).toBeTruthy();
  });

  it('comision table', () => {
    component.comisionTable({ id: 1 })
    component.idBussinessSelected = 1;
    component.updateComision();
    expect(mockDialog.open).toHaveBeenCalled();
  })

});
