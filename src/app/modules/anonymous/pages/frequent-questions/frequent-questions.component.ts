import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-frequent-questions',
  templateUrl: './frequent-questions.component.html',
  styleUrls: ['./frequent-questions.component.scss']
})
export class FrequentQuestionsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    document.querySelector('.gtmPreguntaFrecuenteClicFunciona span').classList.add("gtmPreguntaFrecuenteClicFunciona");
    document.querySelector('.grmPreguntaFrecuenteClicCruzanVenta span').classList.add("grmPreguntaFrecuenteClicCruzanVenta");
    document.querySelector('.gtmPreguntaFrecuenteClicComisiones span').classList.add("gtmPreguntaFrecuenteClicComisiones");
    document.querySelector('.gtmPreguntaFrecuenteClicOfertas span').classList.add("gtmPreguntaFrecuenteClicOfertas");
    document.querySelector('.gtmPreguntaFrecuenteClicNegocios span').classList.add("gtmPreguntaFrecuenteClicNegocios");
    document.querySelector('.gtmPreguntaFrecuenteClicFechasPago span').classList.add("gtmPreguntaFrecuenteClicFechasPago");
    document.querySelector('.gtmPreguntaFrecuenteClicDondePagan span').classList.add("gtmPreguntaFrecuenteClicDondePagan");
    document.querySelector('.gtmPreguntaFrecuenteClicMediosPagos span').classList.add("gtmPreguntaFrecuenteClicMediosPagos");
    document.querySelector('.gtmPreguntaFrecuenteClicEnvios span').classList.add("gtmPreguntaFrecuenteClicEnvios");
  }

}
