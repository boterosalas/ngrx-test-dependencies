import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { MasterDataService } from 'src/app/services/master-data.service';

import { TermsAndConditionsModalComponent } from './terms-and-conditions-modal.component';

describe('TermsAndConditionsModalComponent', () => {
  let component: TermsAndConditionsModalComponent;
  let fixture: ComponentFixture<TermsAndConditionsModalComponent>;
  const mockMasterDataService = jasmine.createSpyObj('MasterDataService', ['getTerms']);
  const mockGetTerms = {
    objectResponse: [
      { sectionvalue: 'sectionvalue1', sectiontitle: 'sectiontitle1' },
      { sectionvalue: 'sectionvalue2', sectiontitle: 'sectiontitle2' },
      { sectionvalue: 'sectionvalue3', sectiontitle: 'sectiontitle3' },
      { sectionvalue: 'sectionvalue4', sectiontitle: 'sectiontitle4' },
      { sectionvalue: 'sectionvalue5', sectiontitle: 'sectiontitle5' },
    ]
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TermsAndConditionsModalComponent],
      imports: [
        HttpClientTestingModule,
        TranslateModule.forRoot({}),
      ],
      providers: [
        { provide: MasterDataService, useValue: mockMasterDataService }
      ]
    }).compileComponents();
    mockMasterDataService.getTerms.and.returnValue(of(mockGetTerms));

    fixture = TestBed.createComponent(TermsAndConditionsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should call getTerms', () => {
    const getTermsSpy = spyOn(component, 'getTerms').and.callFake(() => true);
    component.ngOnInit();
    expect(getTermsSpy).toHaveBeenCalled();
  });

  it('Should getTerms', () => {
    component.getTerms();
    expect(mockMasterDataService.getTerms).toHaveBeenCalled();
    expect(component.contentTerminos).toBe(mockGetTerms.objectResponse[0].sectionvalue);
    expect(component.contentProteccion).toBe(mockGetTerms.objectResponse[1].sectionvalue);
    expect(component.contentTransparencia).toBe(mockGetTerms.objectResponse[2].sectionvalue);
    expect(component.contentPrograma).toBe(mockGetTerms.objectResponse[3].sectionvalue);
    expect(component.contentTerminosPJ).toBe(mockGetTerms.objectResponse[4].sectionvalue);
    expect(component.textTerminos).toBe(mockGetTerms.objectResponse[0].sectiontitle);
    expect(component.textProteccion).toBe(mockGetTerms.objectResponse[1].sectiontitle);
    expect(component.textTransparencia).toBe(mockGetTerms.objectResponse[2].sectiontitle);
    expect(component.textPrograma).toBe(mockGetTerms.objectResponse[3].sectiontitle);
    expect(component.textTerminosPJ).toBe(mockGetTerms.objectResponse[4].sectiontitle);
  });

  it('Should emit true', () => {
    const emitSpy = spyOn(component.acceptTerms, 'emit').and.callFake(() => true);
    component.acceptModal();
    expect(emitSpy).toHaveBeenCalled();
  });


});
