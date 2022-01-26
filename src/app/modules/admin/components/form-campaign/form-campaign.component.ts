import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import moment from 'moment';
import { Subscription } from 'rxjs';
import { ResponseService } from 'src/app/interfaces/response';
import { UserService } from 'src/app/services/user.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-form-campaign',
  templateUrl: './form-campaign.component.html',
  styleUrls: ['./form-campaign.component.scss']
})
export class FormCampaignComponent implements OnInit, OnDestroy {

  campaignForm: FormGroup;
  campaignPattern = '^[a-za-z0-9-]+$';
  private subscription: Subscription = new Subscription();

  edit: boolean;

  constructor(
    private fb:FormBuilder,
    private dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private user: UserService,
    private utils: UtilsService
    ) { }

  ngOnInit(): void {
    this.campaignForm = this.fb.group({
      campaign: ['',  [ Validators.pattern(this.campaignPattern),Validators.required]],
      link: ['', [Validators.required]],
      date: [null],
      register: [false]
    })

    if(this.data) {
      this.edit = this.data.edit;
    }

    
    if(this.edit) {
      this.campaignForm.controls.campaign.setValue(this.data.item.campaign);
      this.campaignForm.controls.link.setValue(this.data.item.link);
      this.campaignForm.controls.date.setValue(this.data.item.publicationdate);
      this.campaignForm.controls.register.setValue(this.data.item.register);
    }

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public saveCampaign() {

    const nameCampaign = this.campaignForm.controls.campaign.value;
    const linkampaign = this.campaignForm.controls.link.value;
    const register = this.campaignForm.controls.register.value;
    let date = this.campaignForm.controls.date.value;

    if (date !== null) {
      date = moment(date).format('YYYY-MM-DD');
    }

    const urlCampaign = `${linkampaign}/?campaign=${nameCampaign}&register=${register}`;

    const params = {
      id:0,
      publishdate: date,
      description: nameCampaign,
      link: linkampaign,
      url:urlCampaign,
      register
    }

    this.subscription = this.user.saveCampaign(params).subscribe((campaign:ResponseService) =>{
      this.utils.openSnackBar(campaign.userMessage, 'Cerrar');
      this.onNoClick();
    })

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
