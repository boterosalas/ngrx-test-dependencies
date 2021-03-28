import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalGenericComponent } from 'src/app/modules/shared/components/modal-generic/modal-generic.component';
import { ContentService } from 'src/app/services/content.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-blog-content',
  templateUrl: './blog-content.component.html',
  styleUrls: ['./blog-content.component.scss']
})
export class BlogContentComponent implements OnInit {
  dateForm: FormGroup
  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private utils: UtilsService,
    private content: ContentService,
    private router: Router
  ) {

  }
  @ViewChild("templateSendEmail", { static: false }) templateBussiness: TemplateRef<
    any
  >;
  url: string;
  datas: any;
  valueLink: string;
  pathUrl: any;
  stringContent = "<p>Para registrarte, debes descargar la aplicaci&oacute;n Clickam en tu celular o ir a la p&aacute;gina&nbsp;<a href='http://www.clickam.com.co/' target='_blank'>www.clickam.com.co</a>,&nbsp;clickear&nbsp;en &ldquo;Iniciar sesi&oacute;n&rdquo;, y seleccionar registrarse, completa el formulario, recuerda que tu contrase&ntilde;a debe contener por lo menos 6 caracteres, con m&iacute;nimo una letra may&uacute;scula, letra min&uacute;scula y un n&uacute;mero; por ejemplo:&nbsp;Clickam1.</p><p>Te llegar&aacute; un correo para activarte, debes tener en cuenta que este correo puede estar en &ldquo;No deseados&rdquo; o &ldquo;spam&rdquo; por ser un nuevo remitente.</p><p>Cuando te registras y activas tu cuenta, te conviertes en&nbsp;Clicker.</p>"
  ngOnInit() {
    let idBlog = this.route.snapshot.paramMap.get("blog");
    //this.pathUrl = this.utils.pathBlog;
    //if (this.pathUrl === undefined) {
    //  this.router.navigate(["/blog"]);
    //}

    this.searchBlog(idBlog);
    let domain = document.location;
    this.url = encodeURI(`${domain}`);
    this.valueLink = encodeURI(`${domain}`);
    this.dateForm = this.fb.group({
      nameBussiness: [null, Validators.required],
      namePerson: [null, Validators.required]
    });
  }
  public searchBlog(element) {
    this.content.getIndividualBlog(element).subscribe((resp) => {
      if (resp.userMessage === "No existe el id") {
        this.router.navigate(["/blog"]);
      }
      else {
        this.datas = resp.objectResponse;
      }
    })
  }
  public copyLink(inputElement: any) {
    inputElement.select();
    document.execCommand("copy");
    inputElement.setSelectionRange(0, 0);
    this.openSnackBar("Se ha copiado el link al portapapeles", "Cerrar");
  }
  private openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000
    });
  }
  sendEmail() {
    const title = "Enviar Email";
    const template = this.templateBussiness;
    const id = "video-modal";
    this.dialog.open(ModalGenericComponent, {
      data: {
        id,
        title,
        template,
      },

    });
  }
  sendMessage() {
    let formData = new FormData();
    formData.append('address', this.dateForm.controls.nameBussiness.value)
    formData.append('subject', "Artículo compartido")
    let mensaje = this.dateForm.controls.namePerson.value + " cree que te puede interesar el siguiente post: " + this.url
    formData.append('message', mensaje);
    this.content.sendMessage(formData).subscribe((resp) => {
      this.openSnackBar("Se ha compartido el link", "Cerrar");
      this.dialog.closeAll();
    })
  }

}
