import { AfterContentInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { ResponseService } from 'src/app/interfaces/response';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.scss']
})
export class DetailUserComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription();
  name:string;
  id: string;

  dataUser = {
    address: '',
    bank: '',
    bankAccountNumber: '',
    cellphone: '',
    createdondate: '',
    department: '',
    email: '',
    firstNames: '',
    firstsale: '',
    idclicker: '',
    identification: '',
    isEmployeeGrupoExito: '',
    lastNames: '',
    lastSale: null,
    municipality: '',
    receiveCommunications: '',
    responseaccountbank: '',
    score: '',
    state: '',
    stateId: null,
    totalCommissions: null,
    totalSales: null,
    typeBankAccount: '',
    userId: null,
    verified: '',
    bankcertificate: '',
    id: null,
    identificationcard1: '',
    identificationcard2: '',
    maxdatebankcertificate: '',
    maxdateidentificationcard1: '',
    maxdateidentificationcard2: '',
    maxdaterut: null,
    maxextensiondatebankcertificate: '',
    maxextensiondateidentificationcard1: '',
    maxextensiondateidentificationcard2: '',
    maxextensiondaterut: '',
    mindatebankcertificate: '',
    mindateidentificationcard1: '',
    mindateidentificationcard2: '',
    mindaterut: null,
    rut: '',
  };

  dataDocuments = {};

  constructor(
    private user:UserService,
    private route: ActivatedRoute
  ) {
    this.subscription = this.route.params.subscribe((userId) => {
      this.id = userId.id;
    });
   }

  ngOnInit(): void {
    this.getUserInfo();
  }

  public getUserInfo(){
    this.subscription = this.user.getUserInfoAditional(this.id).subscribe((resp: ResponseService) => {
      const response = resp.objectResponse;
      this.dataUser = response;
      this.name = `${response.firstNames}  ${response.lastNames}`;
    });

    // this.subscription = this.user.getDocumentsUser('689').subscribe((respDocuments: ResponseService) => {
    //   const response = respDocuments.objectResponse;
    //   console.log(response);
    //   this.dataDocuments = response;
    // });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
