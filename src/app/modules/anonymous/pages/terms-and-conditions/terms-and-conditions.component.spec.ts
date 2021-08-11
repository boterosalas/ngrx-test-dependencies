import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { TermsAndConditionsComponent } from './terms-and-conditions.component';
import { TranslateModule } from '@ngx-translate/core';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LinksService } from 'src/app/services/links.service';
import { of } from 'rxjs/internal/observable/of';
import { By } from '@angular/platform-browser';
import { MasterDataService } from 'src/app/services/master-data.service';

describe('TermsAndConditionsComponent', () => {
  let component: TermsAndConditionsComponent;
  let fixture: ComponentFixture<TermsAndConditionsComponent>;

  const mockLinksService = jasmine.createSpyObj('LinksService', ['getAmount']);
  let responseTerms = {
    Status: 'Success',
    objectResponse: [
      {
        sectionValue: 'Contenido',
        sectionTitle: 'Title',
      },
      {
        sectionValue: 'Contenido',
        sectionTitle: 'Title',
      },
      {
        sectionValue: 'Contenido',
        sectionTitle: 'Title',
      },
      {
        sectionValue: 'Contenido',
        sectionTitle: 'Title',
      },
    ],
  };
  let amount = {
    amountsCommission: 10000,
    amountsReferred: 500000,
  };
  const mockMasterService = jasmine.createSpyObj('MasterDataService', ['getTerms', 'setTerms']);
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TermsAndConditionsComponent],
      imports: [
        TranslateModule.forRoot({}),
        AppMaterialModule,
        BrowserAnimationsModule,
        SharedModule,
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      providers: [
        { provide: LinksService, useValue: mockLinksService },
        { provide: MasterDataService, useValue: mockMasterService },
      ],
    }).compileComponents();
    mockMasterService.getTerms.and.returnValue(of(responseTerms));
    mockLinksService.getAmount.and.returnValue(of(amount));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsAndConditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(mockLinksService.getAmount).toHaveBeenCalled();
    expect(component).toBeTruthy();
  });

  // it("class tags", () => {
  //   component.addTagsclass();
  //   fixture.whenStable().then(()=> {
  //     const nativeElementInput = fixture.nativeElement;
  //     const tab = nativeElementInput.querySelector("'.mat-tab-label[aria-posinset='1']'");
  //     expect(tab).toHaveClass('gtmTerminosCondicionesClicTerminosLegales');
  //   })
  // });
});
