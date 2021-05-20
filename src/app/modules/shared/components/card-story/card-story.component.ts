import { Component, OnInit, Input, Output, EventEmitter, ViewChild, TemplateRef } from '@angular/core';
import { Router } from "@angular/router";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { MatBottomSheet, MatSnackBar } from "@angular/material";
import { DialogComponent } from "src/app/modules/shared/components/dialog/dialog.component";
import { TokenService } from "src/app/services/token.service";
import { LinksService } from "src/app/services/links.service";
import { Subscription } from "rxjs";
import { NgNavigatorShareService } from "ng-navigator-share";
import { ResponseService } from "src/app/interfaces/response";

@Component({
  selector: 'app-card-story',
  templateUrl: './card-story.component.html',
  styleUrls: ['./card-story.component.scss']
})
export class CardStoryComponent implements OnInit {
  // @Input() story: {
  //   id: number,
  //   idbusiness: number,
  //   name: string,
  //   businessName: string,
  //   infoAditional: string,
  //   image: string,
  //   businessImage: string,
  //   businessCode: string,
  //   link: string,
  //   date: Date,
  //   stateView: boolean,
  //   pause: boolean
  // }
  @Input() stories: any
  @Input() storyBusiness: any
  @Input() id: string = "0"
  @Input() index: number = 0
  @Input() pause: boolean = true
  @Input() play: boolean = true
  @Input() showShared: boolean = true
  @Input() showCheck: boolean = false
  @Input() check: boolean = false
  @Input() showProgress: boolean = true
  @Input() showInfo: boolean = true
  @Input() cardOpen: boolean = false
  @Input() showImageClient: boolean = true
  @Input() showTitleClient: boolean = true
  @Input() unifiedStories: boolean = false
  @Output() nextStory = new EventEmitter();
  @Output() checkStory = new EventEmitter();
  @Output() openStoryCard = new EventEmitter();

  progressStory: any
  cardStory: any
  video: any
  currentProgress: any
  currentTime = 0
  sharedOpen: boolean = false
  timeStory: string

  tokenInfo: any;
  idClicker: string;
  showFormCustomer = true;
  reference: boolean;
  showForm = false;
  urlshorten: string = "";
  url: string;
  idCustomerForm: FormGroup;
  formLink: FormGroup;
  business: string;
  plu: string;
  classButtonCopy: string;
  classButtonRefer: string;
  classButtonBuy: string;
  classButtonFacebook: string;
  classButtonTwitter: string;
  classButtonWhatsapp: string;
  classButtonShare: string;
  enableCopy: boolean = true;
  identification: string;
  date: any;
  title: string;
  showReferenceButton: boolean = true;
  numberPattern = "^(0|[0-9][0-9]*)$";
  isImage: boolean
  maxTime: number = 5
  interval: any

  @ViewChild("templateCategories", { static: false })
  templateCategories: TemplateRef<any>;

  private subscription: Subscription = new Subscription();
  private ngNavigatorShareService: NgNavigatorShareService;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private token: TokenService,
    private dialog: MatBottomSheet,
    private links: LinksService,
    private _snackBar: MatSnackBar,
    ngNavigatorShareService: NgNavigatorShareService,
  ) {
    this.ngNavigatorShareService = ngNavigatorShareService;
    if (localStorage.getItem("ACCESS_TOKEN") !== null) {
      this.identification = this.token.userInfo().identification;
    }

    this.idCustomerForm = this.fb.group({
      identification: [
        "",
        [
          Validators.required,
          Validators.pattern(this.numberPattern),
          Validators.maxLength(10),
        ],
      ],
    });
  }

  ngOnInit() {
    if (this.showProgress) {
      this.progressStory = this.stories.map(story => {
        return {
          id: story.id
        }
      })
    }

    const extensionsImg = ["jpg", "jpeg", "png"]

    this.stories = this.stories.map(story => {
      let isImage = (extensionsImg.includes(this.getExtension(story.image)))
      return {
        ...story,
        isImage
      }
    })

    this.title = this.stories.businessCode;
    if (this.title === "movil-exito" ||
      this.title === "haceb" ||
      this.title === "puntos-colombia" ||
      this.title === "seguros" ||
      this.title === "viajes" ||
      this.title === "wesura"
    ) {
      this.showReferenceButton = false;
    }
  }

  ngOnChanges() {
    if (this.play) {
      this.progress()
      //this.vidPause()
    }
  }

  ngAfterViewInit() {
    this.cardStory = document.getElementById(this.id)

    const stoyInit = this.stories.filter(story => story.stateView)
    if (stoyInit && stoyInit.length > 0) {
      this.selectStory(stoyInit[0].id)
    } else {
      this.selectStory(this.stories[0].id)
    }

    if (this.play) {
      this.video = document.getElementById(`video-${this.id}`)
      if (this.video) {
        this.video.addEventListener("loadeddata", () => {
          this.maxTime = this.video.duration
          this.progress()
          //this.vidPause()
        }, true)
      } else {
        this.progress()
      }
    }
  }

  public selectStory(storyId) {
    const file = document.getElementById(`file-${this.id}-${storyId}`)
    if (file && !file.classList.contains("visible")) {
      const visible = document.querySelector(".container-file.visible")
      if (visible) {
        visible.classList.remove("visible")
      }
      file.classList.add("visible")

      const storyS = this.stories.filter(story => story.id === storyId)

      if (storyS && storyS.length > 0) {
        let current:any = new Date()
        let date:any = storyS[0].date
        let result = current - date
        this.timeStory = this.timeConversion(result)
      }
    }
  }

  private getExtension(nameFile: string) {
    if (nameFile) {
      let splitExt = nameFile.split(".");
      return splitExt[splitExt.length - 1].toLocaleLowerCase();
    }

    return null
  }

  private timeConversion(millisec: number) {
    let seconds:any = (millisec / 1000).toFixed(1);

    let minutes:any = (millisec / (1000 * 60)).toFixed(1);

    let hours:any = (millisec / (1000 * 60 * 60)).toFixed(1);

    let days:any = (millisec / (1000 * 60 * 60 * 24)).toFixed(1);

    if (seconds < 60) {
        return Math.round(seconds) + "s";
    } else if (minutes < 60) {
        return Math.round(minutes) + "m";
    } else if (hours < 24) {
        return Math.round(hours) + "h";
    } else {
        return Math.round(days) + "d"
    }
  }

  public viewStory() {
    if (this.cardOpen) this.openStoryCard.emit(this.index)
  }

  private progress() {
    if (this.showProgress && this.cardStory) {
      let totalTime
      if (this.maxTime < 3) {
        totalTime = 3000
      } else if (this.maxTime > 15) {
        totalTime = 15000
      } else {
        totalTime = (this.maxTime * 1000)
      }
      
      this.currentProgress = this.cardStory.querySelector(".story-progress .current-progress")

      if (this.currentProgress.style.width === "100%") {
        this.currentProgress.style.width = "0"
        this.currentTime = 0
        this.vidRestart()
      }

      if (!this.interval) {
        this.interval = setInterval(() => {
          let percent = Math.round((this.currentTime / totalTime)*100)
          this.currentProgress.style.width = `${percent}%`
          if (percent === 100 || this.pause || this.sharedOpen) {
            if (percent === 100) {
              this.pause = true
              this.nextStory.emit(this.index)
            }
            this.vidPause(true)
            percent = 0
            clearInterval(this.interval)
            this.interval = null
          } else {
            this.vidPause(false)
            this.currentTime += 100 // milisegundos
          }
        }, 100)
      }
    }
  }

  private vidPause(pause) {
    //this.video = document.getElementById(`video-${this.id}`)
    if (this.video && !this.isImage) {
      if (pause && !this.video.paused) {
        this.video.pause()
      } else if (!pause && this.video.paused) {
        if (this.video.currentTime === 0) this.currentTime = 0
        this.video.play()
      }
    }
  }

  private vidRestart() {
    if (this.video && !this.isImage) {
      this.video.currentTime = 0
    }
  }

  public checkDeleteStory() {
    this.checkStory.emit(this.check)
  }

  /**
   * Metodo para abrir la modal con el producto seleccionado
   *
   */

   public dataSliderCategory() {
    this.pause = true
    this.sharedOpen = true
    let token = localStorage.getItem("ACCESS_TOKEN");
    if (token !== null) {
      this.tokenInfo = this.token.userInfo();
      this.idClicker = this.tokenInfo.idclicker;
      // this.idClicker = this.tokenInfo.idclicker.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

      const dataCategoryUrl = this.story.link;
      this.showForm = false;
      this.urlshorten = "";
      this.reference = false;
      this.showFormCustomer = true;
      this.url = `${dataCategoryUrl}`;
      setTimeout(() => {
        this.saveLink();
      }, 500);
      this.idCustomerForm.controls.identification.setValue("");
      this.idCustomerForm.reset();
      this.formShareLink();
      const home = true;
      this.business = this.story.idbusiness.toString();
      this.plu = this.story.name;
      const infoaditional = this.story.infoAditional;
      const img = this.story.businessImage;
      const showCloseIcon = true;
      const showClose = false;
      const buttonClose = "Cerrar";
      const showshowTitle = false;
      const title = this.story.name;
      const showProduct = true;
      //const id = sliderInfo.productId;
      // this.classButton = (sliderInfo.description).replace(" ", "");
      this.classButtonWhatsapp = `gtmClicLightboxIconoWhatsApp${this.title}${this.story.name}`
        .replace(/\s/g, "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
      this.classButtonTwitter = `gtmClicLightboxIconoTwitter${this.title}${this.story.name}`
        .replace(/\s/g, "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
      this.classButtonFacebook = `gtmClicLightboxIconoFacebook${this.title}${this.story.name}`
        .replace(/\s/g, "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
      this.classButtonShare = `gtmClicLightboxCompartir${this.title}${this.story.name}`
        .replace(/\s/g, "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
      this.classButtonBuy = `gtmClicLightboxComprar${this.title}${this.story.name}`
        .replace(/\s/g, "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
      this.classButtonRefer = `gtmClicLightboxReferir${this.title}${this.story.name}`
        .replace(/\s/g, "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
      this.classButtonCopy = `gtmClicLightboxCopiarLink${this.title}${this.story.name}`
        .replace(/\s/g, "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

      const template = this.templateCategories;

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
          //id,
          title,
          home,
        },
      });

      dialogref.afterDismissed().subscribe(() => {
        this.enableCopy = true;
        this.pause = false
        this.sharedOpen = false

        this.progress()
      });
    } else {
      this.router.navigate(["/" + this.story.link]);
    }
  }

  /**
   * Metodo para salvar los links generados
   */

   public saveLink(param?: string) {
    let dataSaveLink = {
      link: this.url,
      identification: this.identification,
      plu: this.plu,
      business: this.business,
      creationDate: this.date,
      identificationcustomer: this.idCustomerForm.controls.identification.value,
    };

    this.subscription = this.links
      .saveLink(dataSaveLink)
      .subscribe((resp: ResponseService) => {
        this.urlshorten = resp.objectResponse.link;
        this.enableCopy = false;
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
      link: this.url,
      identification: this.identification,
      plu: this.plu,
      business: this.business,
      creationDate: this.date,
      identificationcustomer: this.idCustomerForm.controls.identification.value,
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
      link: [this.url],
    });
  }

  private openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
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

  buy() {
    let iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    if (iOS) {
      window.location.assign(this.urlshorten);
    } else {
      window.open(this.urlshorten, "_blank");
    }
  }

  share() {
    this.ngNavigatorShareService
      .share({
        title: "",
        text: "",
        url: this.urlshorten,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  public backStep() {
    this.reference = !this.reference;
    this.showForm = !this.showForm;
  }
}
