import { Injectable, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import decode from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor(
    private router: Router,
    private auth: AuthService,
    private user: UserService,
    private _snackBar: MatSnackBar,
    ) {
    this.titleSelect = new BehaviorSubject<string>('Seleccionar');
    this.checkedAll = new BehaviorSubject<boolean>(false);
  }

  isOpen = false;
  isOpenMenu = false;
  isRegisterOpen = false;
  showForgotForm = false;
  showActivateForm = false;
  medals: any;
  pathBlog: any;
  formArray = [];
  titleSelect: BehaviorSubject<string>;
  checkedAll: BehaviorSubject<boolean>;
  validFormat: boolean;
  fileB64 = new BehaviorSubject<string>('');
  file2B64 = new BehaviorSubject<string>('');
  nameFile = new BehaviorSubject<string>('');
  errorFile = new BehaviorSubject<boolean>(false);
  nameFile2 = new BehaviorSubject<string>('');
  errorFile2 = new BehaviorSubject<boolean>(false);

  @Output() change: EventEmitter<boolean> = new EventEmitter();
  @Output() changeMenu: EventEmitter<boolean> = new EventEmitter();
  @Output() changeRegister: EventEmitter<boolean> = new EventEmitter();
  @Output() showForgotFormEmit: EventEmitter<boolean> = new EventEmitter();
  @Output() showActivateFormEmit: EventEmitter<boolean> = new EventEmitter();

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

  showloginForm() {
    this.isOpen = true;
    this.change.emit(this.isOpen);
  }

  showRegisterForm() {
    this.isOpen = true;
    this.changeRegister.emit(this.isOpen);
  }

  hideloginForm() {
    this.isOpen = false;
    this.change.emit(this.isOpen);
  }

  showMenu() {
    this.isOpenMenu = true;
    this.changeMenu.emit(this.isOpenMenu);
  }

  hideMenu() {
    this.isOpenMenu = false;
    this.changeMenu.emit(this.isOpenMenu);
  }

  public showForgot() {
    this.showForgotForm = true;
    this.showForgotFormEmit.emit(this.showForgotForm);
  }

  public showActivate() {
    this.showActivateForm = true;
    this.showActivateFormEmit.emit(this.showActivateForm);
  }

  public hideActivate() {
    this.showActivateForm = false;
    this.showActivateFormEmit.emit(this.showActivateForm);
  }

  public async logout() {
    localStorage.clear();
    this.auth.getRole$.next(null);
    this.auth.isLogged$.next(false);
    this.user.userInfo$.next(null);
    await this.router.navigate(['/inicio']);
  }

  public openpreviewImage(data) {
    const image = new Image();
    image.src = 'data:image/jpg;base64,' + data;

    const w = window.open('');
    w.document.write(image.outerHTML);
  }

  public openpreviewPdf(data) {
    const pdfWindow = window.open('');
    pdfWindow.document.write("<iframe width='100%' height='100%' src='data:application/pdf;base64, " +
      encodeURI(data) + "'></iframe>"
    );
  }

  public checkPermision() {
    const token = localStorage.getItem('ACCESS_TOKEN');
    // decode the token to get its payload
    const tokenPayload = decode(token);
    this.auth.getPermisionByUser('ADMIN').subscribe((respByUser) => {
      const ubication = location.href;
      const route = ubication.split('/');
      const routeslite = '/' + route[route.length - 1];

      const infoRoute = respByUser.find((x) => x.route === routeslite);

      if (infoRoute) {
        this.user.getPermision().subscribe((respPermision) => {
          if (respPermision.state === 'Success') {
            const permisions = respPermision.objectResponse;

            if (permisions) {
              const permissionUser = permisions.find((x) => x.userid === tokenPayload.userid);
              if (permissionUser && permissionUser.permissions) {
                const permissionRoute = permissionUser.permissions.find((x) => x.menuid === infoRoute.idmenu);

                if (!permissionRoute || !permissionRoute.value) {
                  this.router.navigate(['configuracion']);
                }
              }
            }
          }
        });
      }
    });
  }

  public HoraMilitar(time) {
    const format = time.toString().split(' ')[1];
    const hour = time.toString().split(' ')[0].split(':')[0];
    if (hour === 12) {
      const hour = time.toString().split(' ')[0];
      return hour;
    } else {
      if (format === 'PM') {
        const hour = time.toString().split(' ')[0];
        const h = parseInt(hour.split(':')[0]) + 12;
        const m = hour.split(':')[1];
        return h + ':' + m;
      } else {
        if (hour < 10) {
          const hour = 0 + time.toString().split(' ')[0];
          return hour;
        } else {
          const hour = time.toString().split(' ')[0];
          return hour;
        }
      }
    }
  }

  toStandardTime(militaryTime) {
    militaryTime = militaryTime.split(':');
    return militaryTime[0].charAt(0) === 1 && militaryTime[0].charAt(1) > 2
      ? militaryTime[0] - 12 + ':' + militaryTime[1] + ' PM'
      : militaryTime[0] + ':' + militaryTime[1] + ' AM';
  }

  public timeFormat(time) {
    const hour = time.split(':')[0];
    const minute = time.split(':')[1];

    if (hour >= 12) {
      if (hour === 12) {
        const h = hour;
        const m = minute + ' PM';
        return h + ':' + m;
      } else {
        const h = hour - 12;
        const m = minute + ' PM';
        return h + ':' + m;
      }
    } else {
      const h = parseInt(hour);
      return h + ':' + minute + ' AM';
    }
  }

  public download(data, type) {
    const blob = new Blob([data], { type: type });
    const url = window.URL.createObjectURL(blob);
    const downloadLink = document.createElement('a');
    if (type.includes('zip')) {
      downloadLink.href = url;
      downloadLink.download = 'archivo.zip';
      downloadLink.click();
    } else if (type.includes('jpg')) {
      downloadLink.href = url;
      downloadLink.download = 'archivo.jpg';
      downloadLink.click();
    } else if (type.includes('mp4')) {
      downloadLink.href = url;
      downloadLink.download = 'archivo.mp4';
      downloadLink.click();
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  public capitalizeFirstLetter(str: string) {
    return str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : str;
  }

  public addElementArray(event:any, arrayElement: Array<any>, element:string) {
    if (event.checked) {
      arrayElement.push(element);
    } else {
      const index = arrayElement.indexOf(element);
      if (index >= 0) {
        arrayElement.splice(index, 1);
      }
    }
  }

  public onFileChangeFiles(event, extension:string, size: number, param?: string) {

    const nameFile = event.target.files[0].name;
    const reader = new FileReader();
    const sizeFile = event.target.files[0].size;

    this.getExtension(extension, size, nameFile, sizeFile);

    if(this.validFormat === true) {
      if (event.target.files && event.target.files.length) {
        const [file] = event.target.files;
        const fileBlob = new Blob([file]);
        const file2 = new File([fileBlob], nameFile);
        reader.readAsDataURL(file2);
        reader.onload = () => {
          if(param == 'file') {
            this.splitb64(reader.result, 'file');
          }
          if(param == 'file2') {
            this.splitb64(reader.result, 'file2');
          }
        };
      }
      if(param == 'file') {
        this.errorFile.next(false);
        this.nameFile.next(nameFile);
      }
      if(param == 'file2') {
        this.errorFile2.next(false);
        this.nameFile2.next(nameFile);
      }
    } else{
      if(param == 'file') {
        this.errorFile.next(true);
        this.nameFile.next(nameFile);
      }
      if(param == 'file2') {
        this.errorFile2.next(true);
        this.nameFile2.next(nameFile);
      }
    }
    
  }

  private getExtension(extension: string , size:number, nameFile?: string, getSize?: number) {
    const splitExt = nameFile.split('.');
    const getExt = splitExt[splitExt.length - 1].toLocaleLowerCase();
    this.validFormat = false;
    if (getExt === extension ) {
      this.validFormat = true;
    }
    if (getSize / 1000 > size) {
      this.validFormat = false;
    }
  }

  private splitb64(file: any, param: string) {
    const explit64 = file.split('data:application/octet-stream;base64,');
    
    if(param === 'file') {
      this.fileB64.next(explit64[1]);
    }

    if(param === 'file2') {
      this.file2B64.next(explit64[1]);
    }

  }

}
