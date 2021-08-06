import { Component, Input, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { ResponseService } from "src/app/interfaces/response";
import { DialogStoriesComponent } from "src/app/modules/shared/components/dialog-stories/dialog-stories.component";
import { ContentService } from "src/app/services/content.service";
import { UtilsService } from "src/app/services/utils.service";
import Swal from "sweetalert2";
import { StoriesComponent } from "../../pages/stories/stories.component";
import { DialogStoryComponent } from "../dialog-story/dialog-story.component";

@Component({
  selector: "app-card-admin-story",
  templateUrl: "./card-admin-story.component.html",
  styleUrls: ["./card-admin-story.component.scss"],
})
export class CardAdminStoryComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private _content: ContentService,
    private st: StoriesComponent,
    private utils: UtilsService
  ) {}

  @Input() data: any;
  stories = [];
  storiesBusiness = [];
  bussiness: any;

  ngOnInit() {
  }

  public editStory(data) {
    const editStory = this.dialog.open(DialogStoryComponent, {
      width: "800px",
      data: data,
    });
    editStory.beforeClosed().subscribe(() => {
      this._content
        .getStoriesadmin(true, data.idbusiness)
        .subscribe((resp: ResponseService) => {
          this.st.active = resp.objectResponse.active;
          this.st.scheduled = resp.objectResponse.scheduled;
          this.st.drafts = resp.objectResponse.drafts;
          this.st.defeated = resp.objectResponse.defeated;
        });
    });
  }

  public previewItem(index) {
    const openPreview = this.dialog.open(DialogStoriesComponent, {
      data: {
        stories: this.stories,
        id: index,
        showArrows: false,
        showCarousel: false,
      },
      panelClass: "dialog-stories",
      hasBackdrop: false,
      width: "100vw",
      maxWidth: "100vw",
      height: "100vh",
    });

    openPreview.beforeClosed().subscribe(() => {
      this.stories = [];
    })

  }

  deleteStory(data) {
    Swal.fire({
      html: "<h3 class='delete-title-comision'>Eliminar contenido</h3> <p class='w-container'>¿Estás seguro de eliminar el contenido seleccionado?</p>",
      confirmButtonText: "Eliminar contenido",
      cancelButtonText: "Cancelar",
      showCancelButton: true,
      confirmButtonClass: "updateokdelete order-last",
      cancelButtonClass: "updatecancel",
      allowOutsideClick: false,
    }).then((resp: any) => {
      if (resp.dismiss !== "cancel") {
        this._content.deleteStories([data.id]).subscribe(() => {
          this._content
            .getStoriesadmin(true, data.idbusiness)
            .subscribe((resp: ResponseService) => {
              this.st.active = resp.objectResponse.active;
              this.st.scheduled = resp.objectResponse.scheduled;
              this.st.drafts = resp.objectResponse.drafts;
              this.st.defeated = resp.objectResponse.defeated;
            });
        });
      }
    });
  }

  onCheckChange(event) {
    if (event.checked) {
      this.utils.formArray.push(event.source.value);
    } else {
      const index = this.utils.formArray.indexOf(event.source.value);
      if (index >= 0) {
        this.utils.formArray.splice(index, 1);
      }
    }
    if (this.utils.formArray.length > 0) {
      this.utils.titleSelect.next("Deseleccionar");
    } else {
      this.utils.titleSelect.next("Seleccionar");
    }
  }

  public getBusiness() {
    this._content.getBusiness().subscribe((bussiness) => {
      this.bussiness = bussiness;
      this.getStories();
    });
  }

  public getStories() {
    console.log(this.data);
    this.data.forEach((storyS) => {
      let bussinessStory = this.bussiness.filter(
        (b) => b.id === storyS.idbusiness
      )[0];

      const extensionsImg = ["jpg", "jpeg", "png"];
      let isImage = extensionsImg.includes(this.getExtension(storyS.imageurl));

      let objectStory = {
        idbusiness: storyS.idbusiness,
        id: storyS.id,
        businessName: bussinessStory ? bussinessStory.description : "",
        name: storyS.description,
        image: storyS.imageurl,
        infoAditional: storyS.infoaditional,
        businessCode: bussinessStory ? bussinessStory.code : "",
        businessImage: bussinessStory ? bussinessStory.imageurl : "",
        date: new Date(storyS.date),
        link: storyS.link,
        pause: true,
        stateView: !storyS.new,
        isImage,
      };

      this.stories.push(objectStory);

    });

  }
  

  /* public getStories() {
    this._content.getStories(false).subscribe((data: ResponseService) => {
      if (data.state === "Success") {
        if (data.objectResponse) {
          data.objectResponse.forEach(storyS => {
            let bussinessStory = this.bussiness.filter(b => b.id === storyS.idbusiness)[0]

            const extensionsImg = ["jpg", "jpeg", "png"]
            let isImage = (extensionsImg.includes(this.getExtension(storyS.imageurl)))

            let objectStory = {
              idbusiness: storyS.idbusiness,
              id: storyS.id,
              businessName: bussinessStory ? bussinessStory.description : '',
              name: storyS.description,
              image: storyS.imageurl,
              infoAditional: storyS.infoaditional,
              businessCode: bussinessStory ? bussinessStory.code : '',
              businessImage: bussinessStory ? bussinessStory.imageurl : '',
              date: new Date(storyS.date),
              link: storyS.link,
              pause: true,
              stateView: !storyS.new,
              isImage
            }

            this.stories.push(objectStory)

            if (!this.storiesBusiness.some(x => x.idbusiness === storyS.idbusiness)) {
              this.storiesBusiness.push({
                idbusiness: storyS.idbusiness,
                businessImage: bussinessStory ? bussinessStory.imageurl : '',
                businessName: bussinessStory ? bussinessStory.description : '',
                stateView: data.objectResponse.filter(x => x.idbusiness === storyS.idbusiness).some(x => !x.new),
                pause: true
              })
            }
          });

          this.storiesBusiness.sort((a, b) => b.stateView - a.stateView)
        }
      }
    })
  }*/

  private getExtension(nameFile: string) {
    if (nameFile) {
      let splitExt = nameFile.split(".");
      return splitExt[splitExt.length - 1].toLocaleLowerCase();
    }

    return null;
  }
}
