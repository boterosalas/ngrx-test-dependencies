import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Subscription } from 'rxjs';
import { ResponseService } from 'src/app/interfaces/response';
import { ContentService } from 'src/app/services/content.service';

@Component({
  selector: 'app-dialog-faq-item',
  templateUrl: './dialog-faq-item.component.html',
  styleUrls: ['./dialog-faq-item.component.scss'],
})
export class DialogFaqItemComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  item: any;

  faqItemForm: FormGroup;
  configurarEditor: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '300px',
    minHeight: '0',
    maxHeight: 'auto',
    width: '720px',
    minWidth: '0',
    translate: 'yes',
    showToolbar: true,
    placeholder: 'Escriba su articulo...',
    toolbarHiddenButtons: [
      [
        'heading',
        'insertImage',
        'insertVideo',
        'customClasses',
        'removeFormat',
        'fontName',
        'backgroundColor',
        'insertHorizontalRule',
        'toggleEditorMode',
        'undo',
        'redo',
        'strikeThrough',
        'subscript',
        'superscript',
        'justifyLeft',
        'justifyCenter',
        'justifyRight',
        'justifyFull',
      ],
    ],
    defaultParagraphSeparator: 'p',
    defaultFontName: '',
    defaultFontSize: '',
    enableToolbar: true,
    sanitize: true,
    toolbarPosition: 'top',
  };

  constructor(
    private content: ContentService,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.loadItem();
  }

  loadItem() {
    if (this.data.edit === 1) {
      this.faqItemForm = this.fb.group({
        id: [this.data.id],
        idseccion: [this.data.idfaqsection || this.data.idgrupo],
        description: [this.data.description || this.data.name, Validators.required],
        termsEditor: [this.data.sectionvalue, Validators.required],
      });
    } else {
      this.faqItemForm = this.fb.group({
        id: [this.data.id],
        idseccion: [this.data.idfaqsection || this.data.idgrupo],
        description: [null, Validators.required],
        termsEditor: [this.data.sectionvalue, Validators.required],
      });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveFaqItem() {
    this.item = {
      id: this.data.id,
      sectionTitle: this.faqItemForm.controls.description.value,
      sectionValue: this.faqItemForm.controls.termsEditor.value,
      idFaqSection: this.data.idfaqsection,
      orderby: this.data.orderby,
    };

    this.subscription = this.content.saveFaqItem(this.item).subscribe((resp: ResponseService) => {
      if (resp.state === 'Success') {
        this.dialogRef.close();
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
