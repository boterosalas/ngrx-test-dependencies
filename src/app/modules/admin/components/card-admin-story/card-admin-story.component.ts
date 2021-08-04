import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ResponseService } from 'src/app/interfaces/response';
import { DialogStoriesComponent } from 'src/app/modules/shared/components/dialog-stories/dialog-stories.component';
import { ContentService } from 'src/app/services/content.service';
import Swal from 'sweetalert2';
import { StoriesComponent } from '../../pages/stories/stories.component';
import { DialogStoryComponent } from '../dialog-story/dialog-story.component';

@Component({
  selector: 'app-card-admin-story',
  templateUrl: './card-admin-story.component.html',
  styleUrls: ['./card-admin-story.component.scss']
})
export class CardAdminStoryComponent implements OnInit {

  constructor(private dialog: MatDialog, private _content:ContentService, private st:StoriesComponent) { }

  @Input() data:string;
  stories = [];

  ngOnInit() {
  }

  public editStory(data){
   const editStory = this.dialog.open(DialogStoryComponent, {
      width: '800px',
      data: data
    });
    editStory.beforeClosed().subscribe(() => {
      this._content.getStoriesadmin(true, data.idbusiness).subscribe((resp: ResponseService) => {
        this.st.active = resp.objectResponse.active;
        this.st.scheduled = resp.objectResponse.scheduled;
        this.st.drafts = resp.objectResponse.drafts;
        this.st.defeated = resp.objectResponse.defeated;
      });
  
    });
  }

  public previewItem(data) {
    this.stories = [data];
    this.dialog.open(DialogStoriesComponent, {
        data: {
            stories: this.stories,
            id: 0,
            showArrows: false,
            showCarousel: false
        },
        panelClass: 'dialog-stories',
        hasBackdrop: false,
        width: '100vw',
        maxWidth: '100vw',
        height: '100vh'
    });
}

  deleteStory(data){
    Swal.fire({
      html: "<h3 class='delete-title-comision'>Eliminar contenido</h3> <p class='w-container'>¿Estás seguro de eliminar el contenido seleccionado?</p>",
      confirmButtonText: "Eliminar contenido",
      cancelButtonText: "Cancelar",
      showCancelButton: true,
      confirmButtonClass: "updateokdelete order-last",
      cancelButtonClass: "updatecancel",
      allowOutsideClick: false
    }).then((resp: any) => {
      if (resp.dismiss !== 'cancel') {
        this._content.deleteStories([data.id]).subscribe(() => {
          this._content.getStoriesadmin(true, data.idbusiness).subscribe((resp: ResponseService) => {
            this.st.active = resp.objectResponse.active;
            this.st.scheduled = resp.objectResponse.scheduled;
            this.st.drafts = resp.objectResponse.drafts;
            this.st.defeated = resp.objectResponse.defeated;
          });
        });
      }
    })
  }


}


