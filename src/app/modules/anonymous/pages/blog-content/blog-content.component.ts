import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-blog-content',
  templateUrl: './blog-content.component.html',
  styleUrls: ['./blog-content.component.scss']
})
export class BlogContentComponent implements OnInit {

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

}
