import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MasterDataService } from 'src/app/services/master-data.service';

@Component({
  selector: 'app-terms-and-conditions-modal',
  templateUrl: './terms-and-conditions-modal.component.html'
})
export class TermsAndConditionsModalComponent implements OnInit {

  contentTerminos: any;
  contentTerminosPJ: any;
  contentProteccion: any;
  contentTransparencia: any;
  contentPrograma: any;
  textTerminos: any;
  textTerminosPJ: any;
  textProteccion: any;
  textTransparencia: any;
  textPrograma: any;
  @Output() acceptTerms: EventEmitter<any> = new EventEmitter();
  @Input() typedc: string = 'documento';
  constructor(
    private personalInfo: MasterDataService
    ) { }

  ngOnInit(): void {
    this.getTerms();
  }

  
  getTerms() {
    this.personalInfo.getTerms().subscribe((resp: any) => {
      this.contentTerminos = resp.objectResponse[0].sectionvalue;
      this.contentProteccion = resp.objectResponse[1].sectionvalue;
      this.contentTransparencia = resp.objectResponse[2].sectionvalue;
      this.contentPrograma = resp.objectResponse[3].sectionvalue;
      this.contentTerminosPJ = resp.objectResponse[4].sectionvalue;
      this.textTerminos = resp.objectResponse[0].sectiontitle;
      this.textProteccion = resp.objectResponse[1].sectiontitle;
      this.textTransparencia = resp.objectResponse[2].sectiontitle;
      this.textPrograma = resp.objectResponse[3].sectiontitle;
      this.textTerminosPJ = resp.objectResponse[4].sectiontitle;
    });
  }

  acceptModal(){
    this.acceptTerms.emit(true);
  }

}
