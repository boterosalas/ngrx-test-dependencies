import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-us-clickam',
  templateUrl: './contact-us-clickam.component.html',
  styleUrls: ['./contact-us-clickam.component.scss'],
})
export class ContactUsClickamComponent implements OnInit {
  contactUs = [
    {
      name: 'Dónde puedo contactarme si tengo preguntas extras',
      route:
        '/centro-de-ayuda/contactanos/donde-puedo-contactarme-si-tengo-preguntas-extras',
      icon: '/assets/img/ayuda/contactanos/contactanos.svg',
    },
  ];

  constructor() {}

  ngOnInit() {}
}
