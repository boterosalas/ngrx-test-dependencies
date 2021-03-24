import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { AngularEditorConfig } from '@kolkov/angular-editor';
@Component({
  selector: 'app-blog-content',
  templateUrl: './blog-content.component.html',
  styleUrls: ['./blog-content.component.scss']
})
export class BlogContentComponent implements OnInit {
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '300px',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Escriba su articulo...',
    defaultParagraphSeparator: 'p',
    defaultFontName: '',
    defaultFontSize: '',
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['heading', 'insertImage', 'insertVideo',
        'customClasses', 'link', 'unlink',
        'removeFormat', 'fontName', 'backgroundColor',
        'insertHorizontalRule', 'toggleEditorMode', 'undo',
        'redo', 'strikeThrough']
    ]
  };
  htmlContent: string;
  constructor(

    private _snackBar: MatSnackBar,
  ) {

  }
  url: string;
  datas = {
    titulo: "Burbujas y colores: 3 bebidas gasificadas para refrescar tu feed de Instagram",
    date: "2020/11/22",
    author: "Andrés Acosta",
    image: "https://blog.hotmart.com/blog/2018/03/BLOG_tipos-de-blog.png"
  }
  valueLink: string;
  //valueLink = "https://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript"
  stringContent = "<p>Para registrarte, debes descargar la aplicaci&oacute;n Clickam en tu celular o ir a la p&aacute;gina&nbsp;<a href='http://www.clickam.com.co/' target='_blank'>www.clickam.com.co</a>,&nbsp;clickear&nbsp;en &ldquo;Iniciar sesi&oacute;n&rdquo;, y seleccionar registrarse, completa el formulario, recuerda que tu contrase&ntilde;a debe contener por lo menos 6 caracteres, con m&iacute;nimo una letra may&uacute;scula, letra min&uacute;scula y un n&uacute;mero; por ejemplo:&nbsp;Clickam1.</p><p>Te llegar&aacute; un correo para activarte, debes tener en cuenta que este correo puede estar en &ldquo;No deseados&rdquo; o &ldquo;spam&rdquo; por ser un nuevo remitente.</p><p>Cuando te registras y activas tu cuenta, te conviertes en&nbsp;Clicker.</p>"
  ngOnInit() {
    let domain = document.location;
    this.url = encodeURI(`${domain}`);
    this.valueLink = encodeURI(`${domain}`);
  }
  public copyLink(inputElement) {
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
  mostrarContenido() {
    console.log(this.htmlContent);
  }
}
