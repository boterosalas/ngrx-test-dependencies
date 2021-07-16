import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Subscription } from 'rxjs';
import { ResponseService } from 'src/app/interfaces/response';
import { AuthService } from 'src/app/services/auth.service';
import { ContentService } from 'src/app/services/content.service';
import { ListIcons } from 'src/app/services/icons';

@Component({
  selector: 'app-dialog-faq-item',
  templateUrl: './dialog-faq-item.component.html',
  styleUrls: ['./dialog-faq-item.component.scss']
})
export class DialogFaqItemComponent implements OnInit {

  private subscription: Subscription = new Subscription();
  item:any;

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
      ['heading', 'insertImage', 'insertVideo',
        'customClasses',
        'removeFormat', 'fontName', 'backgroundColor',
        'insertHorizontalRule', 'toggleEditorMode', 'undo',
        'redo', 'strikeThrough', 'subscript',
        'superscript', 'justifyLeft',
        'justifyCenter',
        'justifyRight',
        'justifyFull']
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
    private fb: FormBuilder,
    public auth: AuthService,
    ) {
      
    }

  ngOnInit() {
    this.loadItem();
  }

  loadItem() {
    if (this.data.edit === 1) {
      this.faqItemForm = this.fb.group({
        id: [this.data.id],
        idseccion: [this.data.idfaqsection || this.data.idgrupo],
        description: [this.data.description || this.data.name, Validators.required],
        termsEditor: [this.data.sectionvalue, Validators.required]
      });
    } else {
      this.faqItemForm = this.fb.group({
        id: [this.data.id],
        idseccion: [this.data.idfaqsection || this.data.idgrupo],
        description: [null, Validators.required],
        termsEditor: [this.data.sectionvalue, Validators.required]
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
    

    this.content
    .saveFaqItem(this.item)
    .subscribe((resp: ResponseService) => {
      if (resp.state === "Success") {
        this.dialogRef.close();
      }
    });

  }

  /*saveItem() { 
    
    let item;
    if (this.data.isMenu) {
      if (this.data.edit === 0) {
        item = {
          id: 0,
          route: this.faqItemForm.controls.link.value,
          name: this.faqItemForm.controls.description.value,
          icon: this.iconSelected,
          idgrupo: this.data.idseccion,
          active: true
        };
      } else {
        item = {
          id: this.data.id,
          route: this.faqItemForm.controls.link.value,
          name: this.faqItemForm.controls.description.value,
          icon: this.iconSelected,
          idgrupo: this.data.idseccion,
          orderby: this.data.orderby,
          active: this.data.active
        };
      }

      item.rol = this.data.rol;

      this.auth.saveMenu(item).subscribe((resp: ResponseService) => {
        if (resp.state === "Success") {
          this.dialogRef.close();
        }
      });
    } else {
      if (this.data.edit === 0) {
        item = {
          idseccion: this.data.idseccion,
          link: this.faqItemForm.controls.link.value,
          description: this.faqItemForm.controls.description.value,          
        };
      } else {
        item = {
          id: this.data.id,
          idseccion: this.data.idseccion,
          link: this.faqItemForm.controls.link.value,
          description: this.faqItemForm.controls.description.value,          
          orderby: this.data.orderby,
        };
      }

      this.content.saveFooterLink(item).subscribe((resp: ResponseService) => {
        if (resp.state === "Success") {
          this.dialogRef.close();
        }
      });
    }
  }*/

}
