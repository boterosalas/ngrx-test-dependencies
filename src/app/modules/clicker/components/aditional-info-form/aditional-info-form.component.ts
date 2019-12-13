import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material';
import { Subscription, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ResponseService } from 'src/app/interfaces/response';
import { MasterDataService } from 'src/app/services/master-data.service';

@Component({
  selector: 'app-aditional-info-form',
  templateUrl: './aditional-info-form.component.html',
  styleUrls: ['./aditional-info-form.component.scss']
})
export class AditionalInfoFormComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private user: UserService,
    private _snackBar: MatSnackBar,
    private personalInfo: MasterDataService
  ) { }

  personalForm: FormGroup;
  profesionalForm: FormGroup;
  livingForm: FormGroup;

  educationLevel = [];
  fixedIncome = [];
  gender = [];
  maritalStatus = [];
  mobility = [];
  occupation = [];
  typeHousing = [];
  stratum = [
    {id: 1, description: 1},
    {id: 2, description: 2},
    {id: 3, description: 3},
    {id: 4, description: 4},
    {id: 5, description: 5},
    {id: 6, description: 6}
  ]

  people = [
    {id: 0, description: 0},
    {id: 1, description: 1},
    {id: 2, description: 2},
    {id: 3, description: 3},
    {id: 4, description: 4}
  ]

  dependant = [
    {id: 0, description: 0},
    {id: 1, description: 1},
    {id: 2, description: 2},
    {id: 3, description: 3},
    {id: 4, description: 4}
  ]

  userId: string;
  userInfo: any;
  addressInfo:string;
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
  filteredDepartments: Observable<any>;
  filteredCities: Observable<any>;
  disabledCity: boolean;
  departmentCode: string;
  cityCode: string;
  cityValue: string;
  departments = [];
  banks = [];
  cities: [];

  private subscription: Subscription = new Subscription();

  ngOnInit() {

    this.subscription = this.user.userInfo$.subscribe(val => {
      if (!!val) {
        this.userInfo = val;
        this.userId = val.userId;
        this.birthDate = val.birthDate;
        this.maritalStatusOb = {id: val.maritalStatus, description: val.maritalStatusDescription};
        this.genderOb = {id: val.gender, description: val.genderDescription};
        this.educationLevelOb = {id: val.educationlevel, description: val.educationlevelDescription};
        this.occupationOb= {id: val.occupation, description: val.occupationDescription};
        this.fixedIncomeOb = {id: val.fixedIncome, description: val.fixedIncomeDescription};
        this.otherIncomeInfo = val.otherIncome;
        this.stratumOb = {id: val.stratum, description: this.stratum['description']};
        this.typeHousingOb = {id: val.typeHousing , description: val.typeHousingDescription};
        this.numberPeopleLiveOb =  {id: val.numberPeopleLive, description: this.people['description']};
        this.dependantOb=  {id: val.dependents, description: this.dependant['description']};
        this.mobilityOb=  {id: val.mobility, description: val.mobilityDescription};
        this.addressInfo = val.address;
        this.departmentInfo = val.departmentName;
        this.municipalityInfo = val.municipalityName;
     };
     this.getBasicData();
     this.personalFormInfo();
     this.profesionalFormInfo();
     this.livingFormInfo();
     this.getDepartments();
     this.filter();

  })};

  public personalFormInfo() {
    this.personalForm = this.fb.group({
      birthDate: [this.birthDate, Validators.required],
      maritalStatus: [this.maritalStatusOb['id'], Validators.required],
      gender: [this.genderOb['id'], Validators.required],
      educationLevel: [this.educationLevelOb['id'], Validators.required]
    })
  }

  public profesionalFormInfo() {
    this.profesionalForm = this.fb.group({
      occupation: [this.occupationOb['id'], Validators.required],
      fixedIncome: [this.fixedIncomeOb['id'], Validators.required],
      OtherIncome: [this.otherIncomeInfo],
    })
  }

  public livingFormInfo() {
    this.livingForm = this.fb.group({
     address: [this.addressInfo, Validators.required],
     department: [this.departmentInfo, Validators.required],
     city: [this.municipalityInfo, Validators.required],
     stratum: [this.stratumOb['id'], Validators.required],
     typeHousing: [this.typeHousingOb['id'], Validators.required],
     numberPeopleLive: [this.numberPeopleLiveOb['id'], Validators.required],
     dependant: [this.dependantOb['id'], Validators.required],
     mobility: [this.mobilityOb['id'], Validators.required]
    })
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
    })
  }

  public displayDepartment(departments?: any): string | undefined {
    return departments ? departments.description : undefined;
  }


  public filter() {
    this.filteredDepartments = this.livingForm.controls.department.valueChanges
    .pipe(
      map(department => typeof department === 'string' ? department : department.description),
      map(department => department ? this._filterDepartments(department) : this.departments.slice())
    );
  }

  public filterCities() {
    this.filteredCities = this.livingForm.controls.city.valueChanges.pipe(
      startWith(""),
      map(city => (city ? this._filterCities(city) : this.cities.slice()))
    );
  }

  private _filterDepartments(value: any) {
    
    const filterValue = value.toLowerCase();
    return this.departments.filter(
      department =>
        department.description.toLowerCase().indexOf(filterValue) === 0
    );
  }

  private _filterCities(value: string) {
    const filterValue = value.toLowerCase();
    return this.cities.filter(
      (city: any) => city.description.toLowerCase().indexOf(filterValue) === 0
    );
  }


  public selectDepartment(department) {
    this.departmentCode = department.code;
    this.cities = department.municipalities;
    this.livingForm.controls.city.setValue('');
    let valueDepartment = this.livingForm.controls.department.valueChanges;
    this.filterCities();

    valueDepartment.subscribe((resp) => {
      if (resp !== '') {
        this.getDepartments();
      } else {
        this.livingForm.controls.city.setValue('');
      }
    })
  }

  // public checkDepartment() {
  //   if ((this.livingForm.controls.department.value.code !== this.departmentCode) || (this.livingForm.controls.department.value.code === undefined || this.departmentCode === undefined )) {
  //     this.livingForm.controls.department.setErrors({'incorrect': true});
  //   }
  // }

  public selectCity(city) {
    this.cityCode = city.code;
    this.cityValue = city.description;
  }

  public checkCity() {
    if (this.livingForm.controls.city.value !== this.cityValue) {
      this.livingForm.controls.city.setErrors({'incorrectCity': true});
    }
  }

  /**
   * Metodo para listar los departamentos
   */

  public getDepartments() {
    this.subscription = this.personalInfo
      .getDepartments()
      .subscribe((res: ResponseService) => {
        this.departments = res.objectResponse;
      });
  }


  editInfo() {
    this.userInfo.birthDate = this.personalForm.controls.birthDate.value;
    this.userInfo.maritalStatus = this.personalForm.controls.maritalStatus.value;
    this.userInfo.gender = this.personalForm.controls.gender.value;
    this.userInfo.educationLevel = this.personalForm.controls.educationLevel.value;
    this.userInfo.occupation = this.profesionalForm.controls.occupation.value;
    this.userInfo.fixedIncome = this.profesionalForm.controls.fixedIncome.value;
    this.userInfo.OtherIncome = this.profesionalForm.controls.OtherIncome.value;
    this.userInfo.address = this.livingForm.controls.address.value;
    this.userInfo.stratum = this.livingForm.controls.stratum.value;
    this.userInfo.typeHousing = this.livingForm.controls.typeHousing.value;
    this.userInfo.numberPeopleLive = this.livingForm.controls.numberPeopleLive.value;
    this.userInfo.dependents = this.livingForm.controls.dependant.value;
    this.userInfo.mobility = this.livingForm.controls.mobility.value;
    this.userInfo.department =  this.departmentCode;
    this.userInfo.municipality =  this.cityCode;

    this.subscription = this.user
      .updateUser(this.userId, this.userInfo)
      .subscribe(
        (resp: any) => {
          if (resp.state === "Success") {
            this.openSnackBar(resp.userMessage, "Cerrar");
            this.user.getProfile();
          }
        },
        err => {
          this.openSnackBar(err.userMessage, "Cerrar");
        }
      );
  }

  private openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000
    });
  }



}
