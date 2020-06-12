import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-bussiness-clickam',
  templateUrl: './contact-bussiness-clickam.component.html',
  styleUrls: ['./contact-bussiness-clickam.component.scss']
})
export class ContactBussinessClickamComponent implements OnInit {

  contacts = [
    {
      name: "Contactos",
      route:
        "/centro-de-ayuda/contacta-los-negocios/contactos-negocios",
        icon: "/assets/img/ayuda/contactanos/contacta-negocios.svg"
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
