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
      username: [this.data ? this.data.username : '', Validators.required],
      usersocialnetwork: [this.data ? this.data.usersocialnetwork : ''],
      testimony: [this.data ? this.data.testimony : '', [Validators.maxLength(300)]],
      link: [this.data ? this.data.link: ''],
      active: [this.data ? this.data.active : false]
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public saveTestimony() {
    const data = this.testimonyForm.value;
    this.subscription = this.user.saveTestimonies(data).subscribe((saveTestominy: ResponseService) => {
      this.onNoClick();
      this.utils.openSnackBar(saveTestominy.userMessage, 'cerrar');
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
