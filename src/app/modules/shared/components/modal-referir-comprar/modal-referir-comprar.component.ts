import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgNavigatorShareService } from 'ng-navigator-share';
import { Subscription } from 'rxjs';
import { ResponseService } from 'src/app/interfaces/response';
import { ContentService } from 'src/app/services/content.service';
import { LinksService } from 'src/app/services/links.service';
import { TokenService } from 'src/app/services/token.service';
import { DateFormat } from '../../helpers/date-format';

@Component({
  selector: 'app-modal-referir-comprar',
  templateUrl: './modal-referir-comprar.component.html',
  styleUrls: ['./modal-referir-comprar.component.scss']
})
export class ModalReferirComprarComponent implements OnInit, OnDestroy {

  formLink: FormGroup;
  idCustomerForm: FormGroup;
  @Input() banner: any;
  
  private ngNavigatorShareService: NgNavigatorShareService;
  saveMission$: Subscription = new Subscription();
  saveLink$: Subscription = new Subscription();
  saveLinkReference$: Subscription = new Subscription();
  reference: boolean = false;
  url = '';
  identification = '';
  plu = '';
  urlshorten = '';
  bussiness = '';
  showForm = false;
  showFormCustomer = true;
  enableCopy = true;
  classButtonCopy: string = '';
  classButtonRefer: string = '';
  classButtonBuy: string = '';
  classButtonShare: string = '';
  classButtonFacebook: string = '';
  classButtonTwitter: string = '';
  classButtonWhatsapp: string = '';
  
  numberPattern = '^(0|[0-9][0-9]*)$';
  

  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    ngNavigatorShareService: NgNavigatorShareService,
    private content: ContentService,
    private token: TokenService,
    private links: LinksService,
  ) {
    this.ngNavigatorShareService = ngNavigatorShareService;
  }
  
  ngOnInit(): void {
    this.identification = this.token.userInfo().identification;
    this.idCustomerForm = this.fb.group({
      identification: ['', [Validators.required, Validators.pattern(this.numberPattern), Validators.maxLength(10)]],
    });
    this.formLink = this.fb.group({
      link: [this.url],
    });
    this.banner && this.initGtmClasses(this.banner);
  }

  initGtmClasses(category){
    this.classButtonCopy = `gtmClicLightboxCopiarLink${category.business}${category.description}`
      .replace(/\s/g, '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    this.classButtonRefer = `gtmClicLightboxReferir${category.business}${category.description}`
      .replace(/\s/g, '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    this.classButtonBuy = `gtmClicLightboxComprar${category.business}${category.description}`
      .replace(/\s/g, '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    this.classButtonShare = `gtmClicLightboxCompartir${category.business}${category.description}`
      .replace(/\s/g, '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    this.classButtonFacebook = `gtmClicLightboxIconoFacebook${category.business}${category.description}`
      .replace(/\s/g, '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    this.classButtonTwitter = `gtmClicLightboxIconoTwitter${category.business}${category.description}`
      .replace(/\s/g, '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    this.classButtonWhatsapp = `gtmClicLightboxIconoWhatsApp${category.business}${category.description}`
      .replace(/\s/g, '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
      this.url = category.link;
      this.plu = category.description;
      this.bussiness = category.idbusiness;
      this.saveLink();
  }

  
  public copyInputMessage(inputElement: any) {
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
    this.openSnackBar('Se ha copiado el link al portapapeles', 'Cerrar');
  }

  private openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }

  share() {
    this.ngNavigatorShareService
      .share({
        title: '',
        text: '',
        url: this.urlshorten,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  buy() {
    this.saveMission$ = this.content.saveMission('BUY').subscribe();
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    if (iOS) {
      window.location.assign(this.urlshorten);
    } else {
      window.open(this.urlshorten, '_blank');
    }
  }
  
  public saveLinkReference() {
    const data = {
      link: this.url,
      identification: this.identification,
      plu: this.plu,
      business: this.bussiness,
      creationDate: DateFormat.format(new Date(),'YYYY-MM-DD HH:MM'),
      identificationcustomer: this.idCustomerForm.controls.identification.value,
    };
    // this.saveLinkReference$ = this.links.saveLink(data).subscribe((resp: ResponseService) => {
    //   if (resp.state === 'Error') {
    //     this.openSnackBar(resp.userMessage, 'cerrar');
    //   } else {
    //     this.openSnackBar(resp.userMessage, 'cerrar');
    //     // this.idCustomerForm.controls.identificacion.setValue('');
    //     this.dialog.dismiss();
    //   }
    // });
    console.log('DATA',data);
  }

  public saveLink(param?: string) {
    const data = {
      link: this.url,
      identification: this.identification,
      plu: this.plu,
      business: this.bussiness,
      creationDate: DateFormat.format(new Date(),'YYYY-MM-DD HH:MM'),
      identificationcustomer: this.idCustomerForm.controls.identification.value,
    };
    console.log('data',data)
    this.saveLink$ = this.links.saveLink(data).subscribe((resp: ResponseService) => {
      const splice = resp.objectResponse.link.split('//');
      this.urlshorten = 'https://' + splice[1];
      this.enableCopy = false;

      if (param === 'assured') {
        if (resp.state === 'Error') {
          this.openSnackBar(resp.userMessage, 'cerrar');
          this.showForm = false;
          this.showFormCustomer = true;
        }
      }
    });
  }
  

  public backStep() {
    this.reference = !this.reference;
    this.showForm = !this.showForm;
  }

  ngOnDestroy(): void {
    this.saveMission$.unsubscribe();
    this.saveLink$.unsubscribe();
    this.saveLinkReference$.unsubscribe();
  }

}
