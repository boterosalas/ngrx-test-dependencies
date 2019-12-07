import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-frequent-questions',
  templateUrl: './frequent-questions.component.html',
  styleUrls: ['./frequent-questions.component.scss']
})
export class FrequentQuestionsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    document.querySelector('.gtmPreguntaClicLatrlFunciona span').classList.add("gtmPreguntaClicLatrlFunciona");
    document.querySelector('.grmPreguntaClicLatrlVenta span').classList.add("grmPreguntaClicLatrlVenta");
    document.querySelector('.gtmPreguntaClicLatrlComisiones span').classList.add("gtmPreguntaClicLatrlComisiones");
    document.querySelector('.gtmPreguntaClicLatrlOfertas span').classList.add("gtmPreguntaClicLatrlOfertas");
    document.querySelector('.gtmPreguntaClicLatrlNegocios span').classList.add("gtmPreguntaClicLatrlNegocios");
    document.querySelector('.gtmPreguntaClicLatrlFechasPago span').classList.add("gtmPreguntaClicLatrlFechasPago");
    document.querySelector('.gtmPreguntaClicLatrlDondePagan span').classList.add("gtmPreguntaClicLatrlDondePagan");
    document.querySelector('.gtmPreguntaClicLatrlMediosPagos span').classList.add("gtmPreguntaClicLatrlMediosPagos");
    document.querySelector('.gtmPreguntaClicLatrlEnvios span').classList.add("gtmPreguntaClicLatrlEnvios");
  }

}
