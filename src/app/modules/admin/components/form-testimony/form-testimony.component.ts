import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ResponseService } from 'src/app/interfaces/response';
import { UserService } from 'src/app/services/user.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-form-testimony',
  templateUrl: './form-testimony.component.html',
  styleUrls: ['./form-testimony.component.scss']
})
export class FormTestimonyComponent implements OnInit, OnDestroy {
  testimonyForm: FormGroup;
  private subscription: Subscription = new Subscription();

  rating = [
    {value: 1},
    {value: 2},
    {value: 3},
    {value: 4},
    {value: 5},
  ]

  image:string;
  nameFile: string = '';
  errorFile: boolean = false;
  size:number;
  extension: string;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private user: UserService,
    private utils: UtilsService
    ) { }

  ngOnInit(): void {
    this.formTestimony();
  }

  public formTestimony() {
    this.testimonyForm = this.fb.group({
      id: [this.data ? this.data.id : 0],
      username: [this.data ? this.data.username : '', Validators.required],
      rate: [this.data ? this.data.rate : '', Validators.required],
      usersocialnetwork: [this.data ? this.data.usersocialnetwork : ''],
      testimony: [this.data ? this.data.testimony : '', [Validators.maxLength(300)]],
      link: [this.data ? this.data.link: ''],
      imageurl: [this.data ? this.data.imageurl: null],
      active: [this.data ? this.data.active : false]
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public saveTestimony() {
    const data = {
      id: this.testimonyForm.controls.id.value,
      username: this.testimonyForm.controls.username.value,
      rate: this.testimonyForm.controls.rate.value,
      usersocialnetwork: this.testimonyForm.controls.usersocialnetwork.value,
      testimony: this.testimonyForm.controls.testimony.value,
      link: this.testimonyForm.controls.link.value,
      imageurl: this.image,
      active: this.testimonyForm.controls.active.value,
    }

    this.subscription = this.user.saveTestimonies(data).subscribe((saveTestominy: ResponseService) => {
      this.onNoClick();
      this.utils.openSnackBar(saveTestominy.userMessage, 'cerrar');
    });
  }

  public uploadFileImage(e) {
    this.extension = 'jpg';
    this.size = 300;
    this.utils.onFileChangeFiles(e, this.extension, this.size, 'file');

    this.utils.fileB64.subscribe((val:any) => {
      this.image = val;
    });

    this.utils.nameFile.subscribe(nameFile => this.nameFile = nameFile);
    this.utils.errorFile.subscribe(errorFile => this.errorFile = errorFile);
    
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
