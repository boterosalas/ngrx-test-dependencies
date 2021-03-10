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
    dataSourceNews = [{
        consecutive: "00001",
        dateReport: "12/12/2021",
        dateClose: "12/12/2021",
        status: "Activo",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    },
    {
        consecutive: "00002",
        dateReport: "12/12/2021",
        dateClose: "12/12/2021",
        status: "Activo",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    },
    {
        consecutive: "00003",
        dateReport: "12/12/2021",
        dateClose: "12/12/2021",
        status: "Activo",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    }]
    selectedInic: any;
    ngOnInit() {
    }
    stepIni(elem: any) {
        this.selectedInic = elem;
        console.log(this.selectedInic)
    }

}
