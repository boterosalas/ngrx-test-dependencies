import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ModalGenericComponent } from '../modal-generic/modal-generic.component';

@Component({
  selector: 'app-document-type-and-number',
  templateUrl: './document-type-and-number.component.html',
  styleUrls: ['./document-type-and-number.component.scss']
})
export class DocumentTypeAndNumberComponent implements OnInit {
  @Input() idUserType: any;
  @Output() values: EventEmitter<any> = new EventEmitter();

  typedc: string = 'documento';
  socialPattern = '[a-zA-Z0-9 .-_àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ]+';
  numberPattern = '^(0|[0-9][0-9]*)$';
  socialNetworkRegisterForm: FormGroup;
  socialFormIdTypeControl = new FormControl(null, [Validators.required]);
  socialFormIdControl = new FormControl(null, [Validators.required, Validators.maxLength(11), Validators.pattern(this.numberPattern)]);
  socialFormNameControl = new FormControl(null, [Validators.required, Validators.maxLength(50), Validators.pattern(this.socialPattern)]);
  socialFormAcceptTermsControl = new FormControl(null, Validators.required);
  @ViewChild('templateTerms', { static: false })
  templateTerms: TemplateRef<any>;

  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.initSocialNetworkRegisterForm();
  }

  initSocialNetworkRegisterForm() {
    this.socialNetworkRegisterForm = this.formBuilder.group({
      type: this.socialFormIdTypeControl,
      id: this.socialFormIdControl,
      name: this.socialFormNameControl,
      acceptTerms: this.socialFormAcceptTermsControl,
    });
  }

  register(){
    this.socialNetworkRegisterForm.markAllAsTouched();
    if(this.socialNetworkRegisterForm.valid){
      const data = {
        idType: this.socialFormIdTypeControl.value,
        id: this.socialFormIdControl.value,
        bussinessName: this.socialFormNameControl.value,
        acceptTerms: this.socialFormAcceptTermsControl.value,
      };
      this.values.emit(data);
    }
  }

  public selectId(typeId: string) {
    if (typeId === '3') {
      this.typedc = 'nit';
    } else {
      this.socialFormNameControl.clearValidators();
      this.socialFormNameControl.setValue(null);
      this.typedc = 'documento';
    }
  }

  public acceptTermsCheck() {
    if (this.socialFormAcceptTermsControl.value === false) {
      this.socialFormAcceptTermsControl.setValue(null);
    }
  }
  
  public acceptModal() {
    this.dialog.closeAll();
    this.socialFormAcceptTermsControl.setValue(true);
  }

  public termsAndConditions() {
    this.dialog.open(ModalGenericComponent, {
      data: {
        title: '',
        template: this.templateTerms,
      },
    });
  }

}
