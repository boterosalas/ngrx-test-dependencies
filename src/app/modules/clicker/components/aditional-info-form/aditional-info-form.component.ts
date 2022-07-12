import { Component, OnInit, OnDestroy } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { MasterDataService } from 'src/app/services/master-data.service';

@Component({
  selector: 'app-aditional-info-form',
  templateUrl: './aditional-info-form.component.html',
  styleUrls: ['./aditional-info-form.component.scss'],
})
export class AditionalInfoFormComponent implements OnInit, OnDestroy {
  constructor(
    private fb: UntypedFormBuilder,
    public user: UserService,
    private _snackBar: MatSnackBar,
    private personalInfo: MasterDataService
  ) {}

  personalForm: UntypedFormGroup;
  profesionalForm: UntypedFormGroup;
  livingForm: UntypedFormGroup;

  educationLevel = [];
  fixedIncome = [];
  gender = [];
  maritalStatus = [];
  mobility = [];
  occupation = [];
  typeHousing = [];
  stratum = [
    { id: 1, description: 1 },
    { id: 2, description: 2 },
    { id: 3, description: 3 },
    { id: 4, description: 4 },
    { id: 5, description: 5 },
    { id: 6, description: 6 },
  ];

  people = [
    { id: 0, description: 0 },
    { id: 1, description: 1 },
    { id: 2, description: 2 },
    { id: 3, description: 3 },
    { id: 4, description: '4+' },
  ];

  dependant = [
    { id: 0, description: 0 },
    { id: 1, description: 1 },
    { id: 2, description: 2 },
    { id: 3, description: 3 },
    { id: 4, description: '4+' },
  ];

  userId: string;
  userInfo: any;
  addressInfo: string;
  otherIncomeInfo: any;
  departmentInfo;
  municipalityInfo: any;
  birthDate: any;
  maritalStatusOb = {};
  genderOb = {};
  educationLevelOb = {};
  occupationOb = {};
  fixedIncomeOb = {};
  stratumOb = {};
  typeHousingOb = {};
  numberPeopleLiveOb = {};
  dependantOb = {};
  mobilityOb = {};
  banks = [];
  numberPattern = '^(0|[0-9][0-9]*)$';
  maxDate = new Date();
  receiveCommunications: boolean;

  private subscription: Subscription = new Subscription();

  ngOnInit() {
    this.subscription = this.user.userInfo$.subscribe((val) => {
      if (!!val) {
        this.userInfo = val;
        this.userId = val.userId;
        this.birthDate = val.birthDate;
        this.maritalStatusOb = {
          id: val.maritalStatus,
          description: val.maritalStatusDescription,
        };
        this.genderOb = { id: val.gender, description: val.genderDescription };
        this.educationLevelOb = {
          id: val.educationlevel,
          description: val.educationlevelDescription,
        };
        this.occupationOb = {
          id: val.occupation,
          description: val.occupationDescription,
        };
        this.fixedIncomeOb = {
          id: val.fixedIncome,
          description: val.fixedIncomeDescription,
        };
        this.otherIncomeInfo = val.otherIncome;
        this.stratumOb = {
          id: val.stratum,
          description: this.stratum['description'],
        };
        this.typeHousingOb = {
          id: val.typeHousing,
          description: val.typeHousingDescription,
        };
        this.numberPeopleLiveOb = {
          id: val.numberPeopleLive,
          description: this.people['description'],
        };
        this.dependantOb = {
          id: val.dependents,
          description: this.dependant['description'],
        };
        this.mobilityOb = {
          id: val.mobility,
          description: val.mobilityDescription,
        };
        this.addressInfo = val.address;
        this.receiveCommunications = val.receiveCommunications;
      }
      this.getBasicData();
      this.personalFormInfo();
      this.profesionalFormInfo();
      this.livingFormInfo();
    });
  }

  public personalFormInfo() {
    this.personalForm = this.fb.group({
      birthDate: [this.birthDate, Validators.required],
      maritalStatus: [this.maritalStatusOb['id'], Validators.required],
      gender: [this.genderOb['id'], Validators.required],
      educationLevel: [this.educationLevelOb['id'], Validators.required],
    });
  }

  public profesionalFormInfo() {
    this.profesionalForm = this.fb.group({
      occupation: [this.occupationOb['id'], Validators.required],
      fixedIncome: [this.fixedIncomeOb['id'], Validators.required],
      OtherIncome: [this.otherIncomeInfo, [Validators.maxLength(8), Validators.pattern(this.numberPattern)]],
    });
  }

  public livingFormInfo() {
    this.livingForm = this.fb.group({
      stratum: [this.stratumOb['id'], Validators.required],
      typeHousing: [this.typeHousingOb['id'], Validators.required],
      numberPeopleLive: [this.numberPeopleLiveOb['id'], Validators.required],
      dependant: [this.dependantOb['id'], Validators.required],
      mobility: [this.mobilityOb['id'], Validators.required],
    });
  }

  public getBasicData() {
    this.user.getBasicData().subscribe((resp) => {
      this.educationLevel = resp.EducationLevel;
      this.fixedIncome = resp.FixedIncome;
      this.gender = resp.Gender;
      this.maritalStatus = resp.MaritalStatus;
      this.mobility = resp.Mobility;
      this.occupation = resp.Occupation;
      this.typeHousing = resp.TypeHousing;
    });
  }

  // Metodo para editar la informacion adicional del usuario

  editInfo() {
    this.userInfo.birthDate = this.personalForm.controls.birthDate.value;
    this.userInfo.maritalStatus = this.personalForm.controls.maritalStatus.value;
    this.userInfo.gender = this.personalForm.controls.gender.value;
    this.userInfo.educationLevel = this.personalForm.controls.educationLevel.value;
    this.userInfo.occupation = this.profesionalForm.controls.occupation.value;
    this.userInfo.fixedIncome = this.profesionalForm.controls.fixedIncome.value;
    this.userInfo.OtherIncome = this.profesionalForm.controls.OtherIncome.value;
    this.userInfo.stratum = this.livingForm.controls.stratum.value;
    this.userInfo.typeHousing = this.livingForm.controls.typeHousing.value;
    this.userInfo.numberPeopleLive = this.livingForm.controls.numberPeopleLive.value;
    this.userInfo.dependents = this.livingForm.controls.dependant.value;
    this.userInfo.mobility = this.livingForm.controls.mobility.value;
    this.userInfo.receiveCommunications = this.receiveCommunications;
    this.userInfo.bankAccountNumber = null;

    this.subscription = this.user.updateUser(this.userInfo).subscribe(
      (resp: any) => {
        if (resp.state === 'Success') {
          this.openSnackBar(resp.userMessage, 'Cerrar');
          this.subscription = this.user.getProfile();
        }
      },
      (err) => {
        this.openSnackBar(err.userMessage, 'Cerrar');
      }
    );
  }

  private openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
