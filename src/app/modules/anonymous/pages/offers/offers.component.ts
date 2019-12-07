import { Component, OnInit, ViewChild, TemplateRef } from "@angular/core";
import { environment } from "src/environments/environment";
import { DialogComponent } from "src/app/modules/shared/components/dialog/dialog.component";
import { Subscription } from "rxjs";
import { MatSnackBar, MatBottomSheet } from "@angular/material";
import { UserService } from "src/app/services/user.service";
import { AuthService } from "src/app/services/auth.service";
import { ContentService } from "src/app/services/content.service";
import { LinksService } from "src/app/services/links.service";
import { distinctUntilChanged } from "rxjs/operators";
import { FormGroup, FormBuilder } from "@angular/forms";
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: "app-offers",
  templateUrl: "./offers.component.html",
  styleUrls: ["./offers.component.scss"]
})
export class OffersComponent implements OnInit {
  @ViewChild("templateDialog", { static: false }) template: TemplateRef<any>;

  date: any;
  plu: string;
  business: string;
  url: string;
  urlshorten: string;
  isLoggedIn: any;
  identification: string;
  formLink: FormGroup;
  mostprominent = [];
  highercommission = [];
  mostsold = [];
  private subscription: Subscription = new Subscription();

  constructor(
    private _snackBar: MatSnackBar,
    private user: UserService,
    private auth: AuthService,
    private links: LinksService,
    private dialog: MatBottomSheet,
    private fb: FormBuilder,
    private content: ContentService,
    private token: TokenService
  ) {}

  ngOnInit() {
    this.getOffers();
    if(localStorage.getItem("ACCESS_TOKEN") !== null ) {
      this.identification = this.token.userInfo().identification;
    }
  }

  @ViewChild('slickModal', {static: true}) slickModal: SlickCarouselComponent;
  @ViewChild('slickModal2', {static: true}) slickModal2: SlickCarouselComponent;
  @ViewChild('slickModal3', {static: true}) slickModal3: SlickCarouselComponent;

  slideConfig = {
    slidesToShow: 5,
    slidesToScroll: 1,
    infinite: false,
    dots: false,
    dotClass: "slick-dots orange",
    autoplay: false,
    arrows: true,
    centerPadding:'10px',
    // the magic
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          infinite: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          dots: false
        }
      },
      {
        breakpoint: 300,
        settings: "unslick" // destroys slick
      }
    ]
  };

  next() {
    this.slickModal.slickNext();
  }
  
  prev() {
    this.slickModal.slickPrev();
  }

  next2() {
    this.slickModal2.slickNext();
  }
  
  prev2() {
    this.slickModal2.slickPrev();
  }

  next3() {
    this.slickModal3.slickNext();
  }
  
  prev3() {
    this.slickModal3.slickPrev();
  }

  /**
   * Metodo para abrir la modal con el producto seleccionado del exito
   * @param product
   */

  public dataProduct(offer) {
    const dataurl = offer.link;
    this.url = `${dataurl}${this.identification}`;
    this.subscription = this.user
      .getShortUrl(this.url)
      .subscribe((resp: any) => {
        this.urlshorten = resp;
      });
    setTimeout(() => {
      this.saveLink();
    }, 1500);
    this.formShareLink();
    const title = offer.title;
    const id = offer.productId;
    const img = offer.imageurl;
    const price = offer.price;
    const template = this.template;
    const showClose = false;
    const showCloseIcon = true;
    const showProduct = true;
    const showComission = true;
    const showshowTitle = false;
    const buttonClose = "Cerrar";
    const offers = true;
    this.plu = offer.title;
    this.business = offer.business;
    this.dialog.open(DialogComponent, {
      data: {
        title,
        template,
        showClose,
        showCloseIcon,
        img,
        price,
        showProduct,
        showshowTitle,
        showComission,
        buttonClose,
        id,
        offers
      }
    });
  }

  /**
   * Metodo para dalvar los links generados
   */

  public saveLink() {
    let data = {
      identification: this.identification,
      link: this.urlshorten,
      plu: this.plu,
      business: this.business,
      creationDate: this.date
    };
    this.subscription = this.links.saveLink(data).subscribe();
  }

  /**
   * Abre el mensaje de confirmacion de copiado del link
   * @param message
   * @param action
   */

  private openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000
    });
  }

  /* To copy Text from Textbox */
  public copyInputMessage(inputElement: any) {
    inputElement.select();
    document.execCommand("copy");
    inputElement.setSelectionRange(0, 0);
    this.openSnackBar("Se ha copiado el link al portapapeles", "Cerrar");
  }

  private formShareLink() {
    this.formLink = this.fb.group({
      link: [this.url]
    });
  }

  /**
   * Metodo para listar los viajes
   */

  public getOffers() {
    this.subscription = this.content.getOffers().subscribe(offer => {
      this.mostprominent = offer.mostprominent;
      this.highercommission = offer.highercommission;
      this.mostsold = offer.mostsold;
    });
  }
}
