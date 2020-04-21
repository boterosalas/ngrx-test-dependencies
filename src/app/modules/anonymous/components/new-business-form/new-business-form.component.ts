import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { group } from 'console';

@Component({
  selector: 'app-new-business-form',
  templateUrl: './new-business-form.component.html',
  styleUrls: ['./new-business-form.component.scss'],
  animations: [
    trigger("simpleFadeAnimation", [
      // the "in" style determines the "resting" state of the element when it is visible.
      state("in", style({ opacity: 1 })),

      // fade in when created. this could also be written as transition('void => *')
      transition(":enter", [style({ opacity: 0 }), animate(600)]),

      // fade out when destroyed. this could also be written as transition('void => *')
      transition(":leave", animate(600, style({ opacity: 0 })))
    ])
  ]
})
export class NewBusinessFormComponent implements OnInit {

  constructor(
    private fb: FormBuilder
  ) { }

  @Input() categories: Array<any> = [];
  registerForm: FormGroup;
  emailPattern = "[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}";
  namePattern =
    "[a-zA-Z0-9 àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ]+";
  numberPattern = "^(0|[0-9][0-9]*)$";
  domainPattern = "[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+";
  showBusinessForm:boolean = true;
  showTermsBusiness:boolean = false;
  acceptTerms: boolean = null;

  ngOnInit() {
    this.registerBusiness();
  }

  public registerBusiness() {

      this.registerForm = this.fb.group(
        {
          name: [
            "",
            [
              Validators.required,
              Validators.maxLength(50),
              Validators.pattern(this.namePattern)
            ]
          ],
          domain: [
            "",
            [
              Validators.required,
              Validators.maxLength(50),
              Validators.pattern(this.domainPattern)
            ]
          ],
          
          phone: [
            "",
            [
              Validators.required,
              Validators.maxLength(10),
              Validators.minLength(10),
              Validators.pattern(this.numberPattern)
            ]
          ],
          email: [
            "",
            [
              Validators.required,
              Validators.pattern(this.emailPattern),
              Validators.maxLength(64)
            ]
          ],
          category: [this.categories, Validators.required],
          recaptchaReactive: [null, Validators.required],
          acceptTerms: [null, Validators.required]
        }
      );
  }

  public termsAndConditions(){
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
    if(this.acceptTerms === false) {
      this.registerForm.controls.acceptTerms.setValue(null);
    }
  }

}
