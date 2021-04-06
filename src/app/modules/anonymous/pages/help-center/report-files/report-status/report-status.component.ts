import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import * as moment from "moment";
import { ContentService } from 'src/app/services/content.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

moment.locale("es");
@Component({
    selector: 'app-report-status',
    templateUrl: './report-status.component.html',
    styleUrls: ['./report-status.component.scss']
})
export class ReportStatusComponent implements OnInit {
    constructor(
        private fb: FormBuilder,
        private content: ContentService,
        private users: UserService,
    ) {
    }
    //dataSourceNews: any
    selectedInic: any;
    dataSourceNews: any;
    ngOnInit() {
        this.users.getNovetlyUser().subscribe((resp: any) => {
            this.dataSourceNews = resp.objectResponse.novelties
        })
    }
    stepIni(elem: any) {
        this.selectedInic = elem;
    }

}
