import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-link-generator-form',
  templateUrl: './link-generator-form.component.html',
  styleUrls: ['./link-generator-form.component.scss']
})
export class LinkGeneratorFormComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
  ) { }

  generatorForm: FormGroup;
  formLink: FormGroup;
  @Input() bussiness = [];
  @Input() url:string = '';
  @Input() enableButton:boolean;
  @Output() generate = new EventEmitter();

  ngOnInit() {
    this.formGenerator();
    this.formShareLink();
  }

  public formGenerator() {
    this.generatorForm = this.fb.group({
      bussiness: ['',
        Validators.required
      ],
      link: ['',
        Validators.required
      ]
    });
  }

  public formShareLink() {
    this.formLink = this.fb.group({
      link: [this.url, Validators.required]
    });
  }

  public generateLink() {
    let generateValue = {
      Idbusiness: this.generatorForm.controls.bussiness.value,
      link:this.generatorForm.controls.link.value
    };
    this.generate.emit(generateValue);
  }

      /* To copy Text from Textbox */
      public copyInputMessage(inputElement: any) {
        inputElement.select();
        document.execCommand("copy");
        inputElement.setSelectionRange(0, 0);
        this.openSnackBar("Se ha copiado el link al portapapeles", "Cerrar");
      }

      
    /**
   * Abre el mensaje de confirmacion de copiado del link
   * @param message
   * @param action
   */

 

    private openSnackBar(message: string, action: string) {
      this._snackBar.open(message, action, {
        duration: 5000
      });
    }

}
