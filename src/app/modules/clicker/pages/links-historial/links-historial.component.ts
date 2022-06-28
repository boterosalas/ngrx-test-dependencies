import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { LinksService } from 'src/app/services/links.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgNavigatorShareService } from 'ng-navigator-share';
import { DialogComponent } from 'src/app/modules/shared/components/dialog/dialog.component';
import { UtilsService } from 'src/app/services/utils.service';
import { ContentService } from 'src/app/services/content.service';

@Component({
  selector: 'app-links-historial',
  templateUrl: './links-historial.component.html',
  styleUrls: ['./links-historial.component.scss'],
})
export class LinksHistorialComponent implements OnInit {
  dataSource: any;
  pageIndex = 0;
  pageSize = 20;
  pageTo = 20;
  totalItems: number;
  paginate: string;
  private subscription: Subscription = new Subscription();
  orderBy: string;
  startDate:string;
  endDate:string;
  ordination:string;
  from: any;
  to: any;
  orderOptions: any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  orderValue: any;
  @ViewChild('templateCategories', { static: false })
  templateCategories: TemplateRef<any>;
  urlshorten = '';
  url: string;
  classButtonCopy: string;
  classButtonRefer: string;
  classButtonBuy: string;
  classButtonFacebook: string;
  classButtonTwitter: string;
  classButtonWhatsapp: string;
  classButtonShare: string;
  formLink: FormGroup;
  private ngNavigatorShareService: NgNavigatorShareService;
  tokenInfo: any;
  token: any;
  idClicker: any;
  showForm: boolean;
  reference: boolean;
  showFormCustomer: boolean;
  user: any;
  enableCopy: boolean;
  // idCustomerForm: any;
  business: any;
  plu: any;
  title: any;
  router: any;

  constructor(
    private links: LinksService,
    ngNavigatorShareService: NgNavigatorShareService,
    private fb: FormBuilder,
    private dialog: MatBottomSheet,
    private utils: UtilsService,
    private content: ContentService
  ) {
    this.ngNavigatorShareService = ngNavigatorShareService;
  }

  ngOnInit() {
    this.getLinksHistory();
  }

  public pagination(paginate: any) {
    this.pageIndex = paginate;
    this.from = this.pageSize * this.pageIndex + 1 - 20;
    this.to = this.pageSize * (this.pageIndex + 1) - 20;
    this.getLinksHistory(this.from, this.to, this.orderBy, this.ordination, this.startDate, this.endDate);
  }

  public getLinksHistory(from = 1, to = this.pageTo, orderBy = '' , orderOrigin = '', startDate = '', endDate = '') {
    const params = { from, to, orderOrigin , orderBy, startDate, endDate };
    this.subscription = this.links.getLinkHistory(params).subscribe((resp) => {
      resp.linkHistory.map((val) => {
        const split = val.link.split('/#');
        if(split.length > 1) {
          val.link = split[0] + split[1];
        }
      })
      this.totalItems = resp.total;
      this.dataSource = resp.linkHistory;
    });
  }


  /* To copy Text from Textbox */
  public copyInputMessage(inputElement: any) {
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
    this.utils.openSnackBar('Se ha copiado el link al portapapeles', 'Cerrar');
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
    this.subscription = this.content.saveMission('BUY').subscribe();
    window.open(this.urlshorten, '_blank');
  }

  public dataHistory(product) {
    this.enableCopy = false;
    const dataCategoryUrl = product.link;
    this.showForm = false;
    this.urlshorten = '';
    this.reference = false;
    this.showFormCustomer = true;
    this.url = `${dataCategoryUrl}${this.idClicker}`;
    this.subscription = this.user;
    const splice = product.link.split('//');
    this.urlshorten = 'https://' + splice[1];
    this.formShareLink();
    const home = true;
    this.business = product.idbusiness;
    this.plu = product.description;
    const infoaditional = product.infoaditional;
    const img = product.imageurl;
    const showCloseIcon = true;
    const showClose = false;
    const buttonClose = 'Cerrar';
    const showshowTitle = false;
    const title = product.productname;
    const showProduct = true;
    const id = product.productId;
    const history = true;
    this.classButtonWhatsapp = `gtmClicLightboxIconoWhatsApp${title}`
      .replace(/\s/g, '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    this.classButtonTwitter = `gtmClicLightboxIconoTwitter${title}`
      .replace(/\s/g, '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    this.classButtonFacebook = `gtmClicLightboxIconoFacebook${title}`
      .replace(/\s/g, '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    this.classButtonShare = `gtmClicLightboxCompartir${title}`
      .replace(/\s/g, '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    this.classButtonBuy = `gtmClicLightboxComprar${title}`
      .replace(/\s/g, '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    this.classButtonRefer = `gtmClicLightboxReferir${title}`
      .replace(/\s/g, '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    this.classButtonCopy = `gtmClicLightboxCopiarLink${title}`
      .replace(/\s/g, '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

    const template = this.templateCategories;

    const dialogref = this.dialog.open(DialogComponent, {
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
        home,
        history,
      },
    });

    dialogref.afterDismissed().subscribe(() => {
      this.enableCopy = true;
    });
  }

  private formShareLink() {
    this.formLink = this.fb.group({
      link: [this.url],
    });
  }


  sort(event) {
    let name = event.active.toUpperCase();
    const direction = event.direction.toUpperCase();
    if (direction === '') {
      name = '';
    }
    this.orderBy = name;
    this.ordination = direction;
    this.getLinksHistory(this.from, this.to, this.orderBy, this.ordination, this.startDate, this.endDate);
  }

  public filterDate(e) {
    this.startDate = e.startDate;
    this.endDate = e.endDate;
    this.getLinksHistory(this.from, this.to, this.orderBy, this.ordination, this.startDate, this.endDate);
  }

}
