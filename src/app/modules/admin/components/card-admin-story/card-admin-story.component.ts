import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ResponseService } from 'src/app/interfaces/response';
import { DialogStoriesComponent } from 'src/app/modules/shared/components/dialog-stories/dialog-stories.component';
import { ContentService } from 'src/app/services/content.service';
import { UtilsService } from 'src/app/services/utils.service';
import Swal from 'sweetalert2';
import { StoriesComponent } from '../../pages/stories/stories.component';
import { DialogStoryComponent } from '../dialog-story/dialog-story.component';

@Component({
  selector: 'app-card-admin-story',
  templateUrl: './card-admin-story.component.html',
  styleUrls: ['./card-admin-story.component.scss'],
})
export class CardAdminStoryComponent implements OnInit, OnDestroy {
  constructor(private dialog: MatDialog, private _content: ContentService, private st: StoriesComponent, public utils: UtilsService) {}

  @Input() data: any;
  stories = [];
  bussiness: any;
  private subscription: Subscription = new Subscription();

  ngOnInit() {}

  public editStory(data) {
    const editStory = this.dialog.open(DialogStoryComponent, {
      width: '800px',
      data: data,
    });
    this.subscription = editStory.beforeClosed().subscribe((edit) => {
      this._content.getStoriesadmin(true, data.idbusiness).subscribe((resp: ResponseService) => {
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
      panelClass: 'dialog-stories',
      hasBackdrop: false,
      width: '100vw',
      maxWidth: '100vw',
      height: '100vh',
    });

    this.subscription = openPreview.beforeClosed().subscribe(() => {
      this.stories = [];
    });
  }

  deleteStory(data) {
    Swal.fire({
      html: "<h3 class='delete-title-comision'>Eliminar contenido</h3> <p class='w-container'>¿Estás seguro de eliminar el contenido seleccionado?</p>",
      confirmButtonText: 'Eliminar contenido',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      confirmButtonClass: 'updateokdelete order-last',
      cancelButtonClass: 'updatecancel',
      allowOutsideClick: false,
    }).then((resp: any) => {
      if (resp.dismiss !== 'cancel') {
        this.subscription = this._content.deleteStories([data.id]).subscribe((remove) => {
           this._content.getStoriesadmin(true, data.idbusiness).subscribe((storie: ResponseService) => {
            this.st.active = storie.objectResponse.active;
            this.st.scheduled = storie.objectResponse.scheduled;
            this.st.drafts = storie.objectResponse.drafts;
            this.st.defeated = storie.objectResponse.defeated;
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
      this.utils.titleSelect.next('Deseleccionar');
    } else {
      this.utils.titleSelect.next('Seleccionar');
    }
  }

  private getStories() {
    this.data.forEach((storyS) => {
      const bussinessStory = this.bussiness.filter((b) => b.id === storyS.idbusiness)[0];

      const extensionsImg = ['jpg', 'jpeg', 'png'];
      const isImage = extensionsImg.includes(this.getExtension(storyS.imageurl));

      const objectStory = {
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
        isImage,
      };

      this.stories.push(objectStory);
    });
  }

  public getBusiness() {
    this.subscription = this._content.getBusiness().subscribe((bussiness) => {
      this.bussiness = bussiness;
      this.getStories();
    });
  }

  public getExtension(nameFile: string) {
    if (nameFile) {
      const splitExt = nameFile.split('.');
      return splitExt[splitExt.length - 1].toLocaleLowerCase();
    }

    return null;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
