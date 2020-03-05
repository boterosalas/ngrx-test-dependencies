import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, ViewChild, TemplateRef } from '@angular/core';
import { ContentService } from 'src/app/services/content.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DialogComponent } from 'src/app/modules/shared/components/dialog/dialog.component';
import { ResponseService } from 'src/app/interfaces/response';
import { MatBottomSheet, MatSnackBar } from '@angular/material';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { LinksService } from 'src/app/services/links.service';
import { TokenService } from 'src/app/services/token.service';
import { NgNavigatorShareService } from 'ng-navigator-share';
import { Router } from '@angular/router';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {

  constructor(
    private sp: ContentService,
    private dialog: MatBottomSheet,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private user: UserService,
    private auth: AuthService,
    private content: ContentService,
    private links: LinksService,
    private token: TokenService,
    ngNavigatorShareService: NgNavigatorShareService,
    private router: Router
  ) { }

  @Input() sliderWeb:Object;
  @Input() sliderMobile:Object;
  @Output() action = new EventEmitter();

  private subscription: Subscription = new Subscription();
  @ViewChild("templateCategories", { static: false })
  templateCategories: TemplateRef<any>;
  urlshorten: string = '';
  url: string;
  identification: string;
  enableCopy: boolean = true;
  formLink: FormGroup;
  plu: string;
  business: string;
  date: any;
  idCustomerForm: FormGroup;
  showForm = false;
  showFormCustomer = true;
  reference: boolean;
  numberPattern = "^(0|[0-9][0-9]*)$";

  ngOnInit() {

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

  }

  slideConfig = {"slidesToShow": 1, "slidesToScroll": 1, "dots": true, centerMode: true,
  centerPadding: '40px', dotClass: 'slick-dots orange', autoplay: true, autoplaySpeed: 5000, infinite: false}

  openShare() {
    this.action.emit(event);
  }

  /**
   * Metodo para abrir la modal con el producto seleccionado 
   * 
   */

  public dataCategory(category) {
    let token = localStorage.getItem("ACCESS_TOKEN");
      if(token !== null && category.business !=='clickam') {
        this.urlshorten = '';
        this.reference = false;
        const dataCategoryUrl = category.link;
        this.url = `${dataCategoryUrl}${this.identification}`;
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
        const title = category.description;
        const id = category.productId;
        const img = category.imageurl;
        const template = this.templateCategories;
        const showClose = false;
        const showCloseIcon = true;
        const showProduct = true;
        const showshowTitle = false;
        const buttonClose = "Cerrar";
        this.plu = category.description;
        this.business = category.business;
        const home = true;
        let dialogref = this.dialog.open(DialogComponent, {
          data: {
            title,
            template,
            showClose,
            showCloseIcon,
            img,
            showProduct,
            showshowTitle,
            buttonClose,
            id,
            home
          },
        });
    
        dialogref.afterDismissed().subscribe(() => {
          this.enableCopy = true;
        })
      } else {
        this.router.navigate(['/'+category.link]);
      }
  

  }

   /**
   * Metodo para dalvar los links generados
   */

  public saveLink(param?: string) {
    let data = {
      link: this.urlshorten,
      identification: this.identification,
      plu: this.plu,
      business: this.business,
      creationDate: this.date,
      identificationcustomer: this.idCustomerForm.controls.identification.value
    };
    this.subscription = this.links
      .saveLink(data)
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
    let data = {
      link: this.urlshorten,
      identification: this.identification,
      plu: this.plu,
      business: this.business,
      creationDate: this.date,
      identificationcustomer: this.idCustomerForm.controls.identification.value
    };
    this.subscription = this.links
      .saveLink(data)
      .subscribe((resp: ResponseService) => {
        if (resp.state === "Error") {
          this.openSnackBar(resp.userMessage, "cerrar");
        } else {
          this.openSnackBar(resp.userMessage, "cerrar");
          // this.idCustomerForm.controls.identificacion.setValue('');
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
      // this.idCustomerForm.controls.identification.setValue('');
      this.idCustomerForm.reset();
    }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  

}