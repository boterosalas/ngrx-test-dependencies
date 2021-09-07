import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Subscription } from 'rxjs';
import { ContentService } from 'src/app/services/content.service';
import { ResponseService } from 'src/app/interfaces/response';
import Swal from 'sweetalert2';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-new-business-form',
  templateUrl: './new-business-form.component.html',
  styleUrls: ['./new-business-form.component.scss'],
  animations: [
    trigger('simpleFadeAnimation', [
      // the "in" style determines the "resting" state of the element when it is visible.
      state('in', style({ opacity: 1 })),

      // fade in when created. this could also be written as transition('void => *')
      transition(':enter', [style({ opacity: 0 }), animate(600)]),

      // fade out when destroyed. this could also be written as transition('void => *')
      transition(':leave', animate(600, style({ opacity: 0 }))),
    ]),
  ],
})
export class NewBusinessFormComponent implements OnInit, OnDestroy {
  constructor(private fb: FormBuilder, private content: ContentService, private dialog: MatDialog, public dialogRef: MatDialogRef<any>) {}

  @Input() categories: Array<any> = [];
  @Output() registerBusinessEmit = new EventEmitter();
  private subscription: Subscription = new Subscription();

  registerForm: FormGroup;
  emailPattern = '[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}';
  namePattern = '[a-zA-Z0-9 àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ]+';
  numberPattern = '^(0|[0-9][0-9]*)$';
  domainPattern = '[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:.[a-zA-Z]{2,})+';
  showBusinessForm = true;
  showTermsBusiness = false;
  acceptTerms = null;

  ngOnInit() {
    this.registerBusiness();
    this.getCategoriesBusiness();
  }

  public registerBusiness() {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(this.namePattern)]],
      domain: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(this.domainPattern)]],
      contact: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(this.namePattern)]],
      phone: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern(this.numberPattern)]],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern), Validators.maxLength(64)]],
      category: [this.categories, Validators.required],
      recaptchaReactive: [null, Validators.required],
      acceptTerms: [null, Validators.required],
    });
  }

  public termsAndConditions() {
    this.showBusinessForm = false;
    this.showTermsBusiness = true;
  }

  public accept() {
    this.showBusinessForm = true;
    this.showTermsBusiness = false;
    this.registerForm.controls.acceptTerms.setValue(true);
  }

  public decline() {
    this.showBusinessForm = true;
    this.showTermsBusiness = false;
    this.registerForm.controls.acceptTerms.setValue(null);
  }

  public acceptTermsCheck() {
    this.acceptTerms = !this.acceptTerms;
    if (this.acceptTerms === false) {
      this.registerForm.controls.acceptTerms.setValue(null);
    }
  }

  register(data) {
    const formInfo = data.value;
    const infoBusiness = {
      description: formInfo.name,
      website: formInfo.domain,
      contactname: formInfo.contact,
      contactphone: formInfo.phone,
      contactemail: formInfo.email,
      category: formInfo.category,
      acceptTerms: formInfo.acceptTerms,
      acceptHabeasData: true,
    };
    this.subscription = this.content.registerBusinessClicker(infoBusiness).subscribe(
      (resp: ResponseService) => {
        if (resp.state === 'Success') {
          this.dialog.closeAll();
          Swal.fire({
            title: 'Registro exitoso',
            text: resp.userMessage,
            type: 'success',
            confirmButtonText: 'Aceptar',
            confirmButtonClass: 'accept-register-alert-success',
          });
        } else {
          this.dialog.closeAll();
          Swal.fire({
            title: 'Registro erróneo',
            text: resp.userMessage,
            type: 'error',
            confirmButtonText: 'Aceptar',
            confirmButtonClass: 'accept-register-alert-error',
          });
        }
      },
      (error) => {
        this.dialog.closeAll();
        Swal.fire({
          title: error.statusText,
          text: error.error,
          type: 'error',
          confirmButtonText: 'Aceptar',
          confirmButtonClass: 'accept-register-alert-invalid',
        });
      }
    );
  }

  public getCategoriesBusiness() {
    this.subscription = this.content.getCategoriesBusinessHome().subscribe((categories) => (this.categories = categories));
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
