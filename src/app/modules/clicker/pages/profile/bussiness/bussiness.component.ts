import { Component, OnInit, HostListener, ViewChild, TemplateRef, OnDestroy } from '@angular/core';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { ContentService } from 'src/app/services/content.service';
import { UtilsService } from 'src/app/services/utils.service';
import { distinctUntilChanged } from 'rxjs/operators';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DialogComponent } from 'src/app/modules/shared/components/dialog/dialog.component';
import { ResponseService } from 'src/app/interfaces/response';
import { MatBottomSheet, MatSnackBar, MatDialog } from '@angular/material';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { LinksService } from 'src/app/services/links.service';
import { TokenService } from 'src/app/services/token.service';
import { NgNavigatorShareService } from 'ng-navigator-share';
import { ModalGenericComponent } from 'src/app/modules/shared/components/modal-generic/modal-generic.component';

@Component({
  selector: 'app-bussiness',
  templateUrl: './bussiness.component.html',
  styleUrls: ['./bussiness.component.scss']
})
export class BussinessComponent implements OnInit, OnDestroy {

  id:string;
  title: string;
  percent: string;
  percentBussiness:string = "Hasta 9.6%";
  bussiness = [];

  @ViewChild("templateTerms", { static: false })
  templateTerms: TemplateRef<any>;

  private subscription: Subscription = new Subscription();
  private ngNavigatorShareService: NgNavigatorShareService;
  image:string;
  template: any;
  numberPattern = "^(0|[0-9][0-9]*)$";
  showFormCustomer = true;
  reference: boolean;
  showForm = false;
  termsForm: FormGroup;
  idCustomerForm: FormGroup;
  date: any;
  business: string;
  plu: string;
  formLink: FormGroup;
  enableCopy: boolean = true;
  identification: string;
  @ViewChild("templateCategories", { static: false })
  templateCategories: TemplateRef<any>;
  @ViewChild("templateDialogAssured", { static: false })
  templateAssured: TemplateRef<any>;
  urlshorten: string = '';
  url: string;
  classButtonCopy: string;
  classButtonRefer: string;
  classButtonBuy: string;
  classButtonFacebook: string;
  classButtonTwitter: string;
  classButtonWhatsapp: string;
  classButtonShare: string;
  acceptTerms: boolean = null;
  terms: boolean = false;
  tokenInfo: any;
  idClicker: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private content: ContentService,
    private utils: UtilsService,
    private sp: ContentService,
    private dialog: MatBottomSheet,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private user: UserService,
    public auth: AuthService,
    private links: LinksService,
    private token: TokenService,
    ngNavigatorShareService: NgNavigatorShareService,
    private dialogModal: MatDialog
  ) { 
    
    this.ngNavigatorShareService = ngNavigatorShareService;

    this.route.params.subscribe(route => {
      this.title = route.code;
      this.percent = route.infoAditional;
      this.id = route.id;
      this.image = route.imageurl;
    });

  }

  ngOnInit() {
    this.getContentBussiness();

    if(localStorage.getItem("ACCESS_TOKEN") !== null ) {
      this.identification = this.token.userInfo().identification;
    }

    this.idCustomerForm = this.fb.group({
      identification: [
        "",
        [
          Validators.required,
          Validators.pattern(this.numberPattern),
          Validators.maxLength(10)
        ]
      ]
    });

    this.termsForm = this.fb.group({
      acceptTerms: [null, Validators.required]
    })

  }



  public getContentBussiness() {
    this.content.getBusinessContent(this.id)
    .pipe(distinctUntilChanged())
    .subscribe(bussiness => {
      this.bussiness = bussiness;
    })
  }

  public goback() {
    this.router.navigate(['./']);
  }

  
   /**
   * Metodo para salvar los links generados
   */

  public saveLink(param?: string) {

    let dataSaveLink = {
      link: this.urlshorten,
      identification: this.identification,
      plu: this.plu,
      business: this.business,
      creationDate: this.date,
      identificationcustomer: this.idCustomerForm.controls.identification.value
    };

    this.subscription = this.links
      .saveLink(dataSaveLink)
      .subscribe((resp: ResponseService) => {
        if (param === "assured") {
          if (resp.state === "Error") {
            this.openSnackBar(resp.userMessage, "cerrar");
            this.showForm = false;
            this.showFormCustomer = true;
          }
        }
      });
  }

  /**
   * Metodo para dalvar los links reference
   */

  public saveLinkReference() {
    let dataSaveLinkReference = {
      link: this.urlshorten,
      identification: this.identification,
      plu: this.plu,
      business: this.business,
      creationDate: this.date,
      identificationcustomer: this.idCustomerForm.controls.identification.value
    };
    this.subscription = this.links
      .saveLink(dataSaveLinkReference)
      .subscribe((resp: ResponseService) => {
        if (resp.state === "Error") {
          this.openSnackBar(resp.userMessage, "cerrar");
        } else {
          this.openSnackBar(resp.userMessage, "cerrar");
          this.dialog.dismiss();
        }
      });
  }

  private formShareLink() {
    this.formLink = this.fb.group({
      link: [this.url]
    });
  }

   /**
   * Obtiene la fecha actual
   */

  public getDate() {
    let today = new Date();
    let date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    let time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    this.date = date + " " + time;
  }

   /**
   * Abre el mensaje de confirmacion de copiado del link
   * @param message
   * @param action
   */

  private openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000
    });
  }

    /* To copy Text from Textbox */
    public copyInputMessage(inputElement: any) {
      inputElement.select();
      document.execCommand("copy");
      inputElement.setSelectionRange(0, 0);
      this.openSnackBar("Se ha copiado el link al portapapeles", "Cerrar");
    }

    public showReference() {
      this.reference = !this.reference;
      this.idCustomerForm.reset();
    }

    share() {
      this.ngNavigatorShareService.share({
        title: '',
        text: '',
        url: this.urlshorten
      }).then( (response) => {
        console.log(response);
      })
      .catch( (error) => {
        console.log(error);
      });
    }

    buy() {
      var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
      if(iOS) {
        window.location.assign(this.urlshorten)
      } else {
        window.open(this.urlshorten,'_blank');
      }
    }

    public nextStep() {
      this.showForm = !this.showForm;
      this.showFormCustomer = !this.showFormCustomer;
      this.saveLink("assured");
    }
    
    public backStep() {
      this.reference = !this.reference;
      this.showForm = !this.showForm;
    }

    /**
   * Metodo para abrir la modal con el producto seleccionado 
   * 
   */

  public dataSliderCategory(sliderInfo) {
    let token = localStorage.getItem("ACCESS_TOKEN");
      if(token !== null && sliderInfo.business !=='clickam') {
        this.tokenInfo = this.token.userInfo();
        this.idClicker = this.tokenInfo.idclicker;
        // this.idClicker = this.tokenInfo.idclicker.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const dataCategoryUrl = sliderInfo.link;
        this.showForm = false;
        this.urlshorten = '';
        this.reference = false;
        this.showFormCustomer = true;
        this.url = `${dataCategoryUrl}${this.idClicker}`;
        this.subscription = this.user
          .getShortUrl(this.url)
          .subscribe((resp: any) => {
            this.urlshorten = resp;
            this.enableCopy = false;
            this.saveLink();
          });
        this.idCustomerForm.controls.identification.setValue("");
        this.idCustomerForm.reset();
        this.formShareLink();
        const home = true;
        this.business = sliderInfo.idbusiness;
        this.plu = sliderInfo.description;
        const infoaditional = sliderInfo.infoaditional;
        const img = sliderInfo.imageurl;
        const showCloseIcon = true;
        const showClose = false;
        const buttonClose = "Cerrar";
        const showshowTitle = false;
        const title = sliderInfo.description;
        const showProduct = true;
        const id = sliderInfo.productId;
        // this.classButton = (sliderInfo.description).replace(" ", "");
        this.classButtonWhatsapp= `gtmClicLightboxIconoWhatsApp${this.title}${sliderInfo.description}`.replace(/\s/g,'').normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        this.classButtonTwitter = `gtmClicLightboxIconoTwitter${this.title}${sliderInfo.description}`.replace(/\s/g,'').normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        this.classButtonFacebook = `gtmClicLightboxIconoFacebook${this.title}${sliderInfo.description}`.replace(/\s/g,'').normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        this.classButtonShare = `gtmClicLightboxCompartir${this.title}${sliderInfo.description}`.replace(/\s/g,'').normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        this.classButtonBuy = `gtmClicLightboxComprar${this.title}${sliderInfo.description}`.replace(/\s/g,'').normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        this.classButtonRefer = `gtmClicLightboxReferir${this.title}${sliderInfo.description}`.replace(/\s/g,'').normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        this.classButtonCopy = `gtmClicLightboxCopiarLink${this.title}${sliderInfo.description}`.replace(/\s/g,'').normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        if(sliderInfo.idbusiness !== 3 && sliderInfo.idbusiness !== 5) {
          this.template = this.templateCategories;
        } else {
          this.template = this.templateAssured;
        }

        const template = this.template;

        let dialogref = this.dialog.open(DialogComponent, {
          data: {
            template,
            infoaditional,
            showClose,
            img,
            showCloseIcon,
            showProduct,
            buttonClose,
            showshowTitle,
            id,
            title,
            home
          },
        });
    
        dialogref.afterDismissed().subscribe(() => {
          this.enableCopy = true;
        })
      } else {
        this.router.navigate(['/'+sliderInfo.link]);
      }
  

  }

  public acceptModal() {
    this.dialogModal.closeAll();
    this.acceptTerms = true;
    this.termsForm.controls.acceptTerms.setValue(true);
  }

  /**
   * check para aceptar terminos y condiciones
   */

  public acceptTermsCheck() {
    this.acceptTerms = !this.acceptTerms;
    if(this.acceptTerms === false) {
      this.termsForm.controls.acceptTerms.setValue(null);
    }
  }

  public termsAndConditions() {
   
    const template = this.templateTerms;
    const title = "";

    this.dialogModal.open(ModalGenericComponent, {
      data: {
        title,
        template
      }
    });
  }

  public registerUser() {
    this.user.registeruserterms(this.id).subscribe( (resp:any) => {
      if(resp.state === 'Success') {
       console.log(resp); 
      }
    })
  }



  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  
 
}
