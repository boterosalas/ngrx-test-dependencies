import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import moment from 'moment';

@Component({
  selector: 'app-form-campaign',
  templateUrl: './form-campaign.component.html',
  styleUrls: ['./form-campaign.component.scss']
})
export class FormCampaignComponent implements OnInit {

  campaignForm: FormGroup;
  campaignPattern = '^[a-za-z0-9-]+$';

  edit: boolean;

  constructor(private fb:FormBuilder, private dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit(): void {
    this.campaignForm = this.fb.group({
      campaign: ['',  [ Validators.pattern(this.campaignPattern),Validators.required]],
      link: ['', [Validators.required]],
      date: [null],
      register: [false]
    })

    this.edit = this.data.edit;

    
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

    const urlCampaign = `${linkampaign}/?campaign=${nameCampaign}`;

    const params = {
      date,
      urlCampaign,
      register
    }

    console.log(params);

  }

  

}
