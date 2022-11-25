import { AfterViewInit, Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { of, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ContentService } from 'src/app/services/content.service';
import { TokenService } from 'src/app/services/token.service';
import { UtilsService } from 'src/app/services/utils.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-banner-principal',
  templateUrl: './banner-principal.component.html',
  styleUrls: ['./banner-principal.component.scss']
})
export class BannerPrincipalComponent implements OnInit, OnDestroy, AfterViewInit {
  route: string = '';
  isAnExternalRedirect: boolean = false;

  isLogged$: Subscription = new Subscription();
  saveVisitOffer$: Subscription = new Subscription();

  @ViewChild('modalReferirComprarTemplate', { static: false })
  modalReferirComprarTemplate: TemplateRef<any>;

  banner: any = {
    imageurlweb: "https://www.clickam.com.co/assets/img/home/gana-lg.png",
    business: "clickam",
    idbusiness: 1,
    infoaditional: "16000",
    type: "BANNER",
    date: "2022-10-22T14:41:30.403",
    orderby: 3,
    active: true,
    imagemobile: null,
    imageweb: null,
    datestart: null,
    id: 144,
    description: "Viajes",
    link: "https://www.viajesexito.com/vuelos2?utm_source=clickam&utm_medium=referral&utm_campaign=vuelos&utm_term={1}",
    // link: null,
    imageurlmobile: "https://www.clickam.com.co/assets/img/home/gana-lg.png",
    dateend: null,
    textbutton: null,
    colorbutton: null,
    seccion: null,
    new: false,
    clicks: 0,
    uniqueclicks: 0,
    filter: "TODOS"
  }

  constructor(
    public auth: AuthService,
    private utils: UtilsService,
    private dialog: MatBottomSheet,
    private content: ContentService,
    private token: TokenService,
  ) { }

  ngOnInit(): void {
    // 1. Debo llamar el GET banner
    // 2. Asignar el banner a this.banner
    // 3. Llamar this.evaluateBannerBehaviour()
    this.evaluateBannerBehaviour();
  }

  ngAfterViewInit(): void {
    this.checkBannerInLocalStorage();
  }

  evaluateBannerBehaviour() {
    if (this.banner.link) {
      this.route = this.banner.link;
      if (this.banner.business === 'clickam') {
        this.isAnExternalRedirect = true;
      }
    }
  }

  checkBannerInLocalStorage() {
    const banner = localStorage.getItem('banner');
    this.isLogged$ = this.auth.isLogged$.subscribe((val) => {
      if (val && banner) {
        this.banner = JSON.parse(banner);
        this.saveVisit();
        this.openShare(this.banner);
        localStorage.removeItem('banner');
      }
    })
  }

  bannerClick() {
    if (this.auth.isLoggedIn()) {
      this.saveVisit();
      if (this.route && !this.isAnExternalRedirect) {
        this.openShare(this.banner);
      }
    } else {
      if (this.route && !this.isAnExternalRedirect) {
        localStorage.setItem('banner', JSON.stringify(this.banner));
        this.utils.showloginForm();
      }
    }
  }

  saveVisit() {
    this.saveVisitOffer$ = this.content.saveVisitOffer({ idoffer: this.banner.id, userId: this.token.userInfo().userid }).subscribe();
  }

  openShare(banner) {
    this.dialog.open(DialogComponent, {
      data: {
        title: banner.description,
        template: this.modalReferirComprarTemplate,
        showClose: false,
        showCloseIcon: true,
        infoaditional: banner.infoaditional,
        img: banner.imageurlweb,
        showProduct: true,
        showshowTitle: false,
        buttonClose: 'Cerrar',
        id: banner.id,
        home: true,
      },
    });
  }

  ngOnDestroy(): void {
    this.isLogged$.unsubscribe();
    this.saveVisitOffer$.unsubscribe();
  }
}
