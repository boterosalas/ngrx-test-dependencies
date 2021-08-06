import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { BehaviorSubject } from "rxjs";
import { Subscription } from "rxjs";
import { ResponseService } from "src/app/interfaces/response";
import { ContentService } from "src/app/services/content.service";
import { UtilsService } from "src/app/services/utils.service";
import { DialogStoryComponent } from "../../components/dialog-story/dialog-story.component";

@Component({
  selector: "app-stories",
  templateUrl: "./stories.component.html",
  styleUrls: ["./stories.component.scss"],
})
export class StoriesComponent implements OnInit, OnDestroy {
  constructor(
    private content: ContentService,
    private dialog: MatDialog,
    private utils: UtilsService,
  ) {}

  private subscription: Subscription = new Subscription();
  business = [];
  newStoryActiveButton = true;
  idBussiness: number;
  titleSelect: string;
  checkedAll: Boolean;
  activeSelectAll = true;

  active = [];
  scheduled = [];
  drafts = [];
  defeated = [];

  ngOnInit() {
    this.getAllBusiness();

    this.utils.titleSelect.subscribe((title) => {
      this.titleSelect = title;
    });
  }

  public getAllBusiness() {
    this.subscription = this.content.getAllBusiness().subscribe((resp) => {
      this.business = resp;
    });
  }

  public onChangeSelected(business) {
    if (business !== "") {
      this.newStoryActiveButton = false;
      this.idBussiness = business.id;
    } else {
      this.newStoryActiveButton = true;
    }

    this.getStories();
  }

  public newStory() {
    const newStory = this.dialog.open(DialogStoryComponent, {
      width: "800px",
      data: this.idBussiness,
    });

    newStory.beforeClosed().subscribe(() => {
      this.getStories();
    });
  }

  private getStories() {
    this.content
      .getStoriesadmin(true, this.idBussiness)
      .subscribe((resp: ResponseService) => {
        this.active = resp.objectResponse.active;
        this.scheduled = resp.objectResponse.scheduled;
        this.drafts = resp.objectResponse.drafts;
        this.defeated = resp.objectResponse.defeated;
        if (
          this.active.length > 0 ||
          this.scheduled.length > 0 ||
          this.drafts.length > 0 ||
          this.defeated.length > 0
        ) {
          this.activeSelectAll = false;
        } else {
          this.activeSelectAll = true;
        }
      });
  }

  selectAll() {
    
      if (this.utils.checkedAll.getValue() === false) {
        this.utils.checkedAll.next(true);
        this.utils.titleSelect.next("Deseleccionar");

        this.active.forEach((element) => {
          this.utils.formArray.push(element.id);
        });

        this.scheduled.forEach((element) => {
          this.utils.formArray.push(element.id);
        });

        this.drafts.forEach((element) => {
          this.utils.formArray.push(element.id);
        });

        this.defeated.forEach((element) => {
          this.utils.formArray.push(element.id);
        });
      } else {
        this.utils.checkedAll.next(false);
        this.utils.titleSelect.next("Seleccionar");
        this.utils.formArray = [];
      }
    
  }

  deletetAll() {
    this.content.deleteStories(this.utils.formArray).subscribe(() => {
      this.getStories();
      this.utils.titleSelect.next("Seleccionar");
      this.utils.formArray = [];
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
