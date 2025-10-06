import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
@Component({
  selector: 'app-calculadora-imc',
  templateUrl: './calculadora-imc.page.html',
  styleUrls: ['./calculadora-imc.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class CalculadoraImcPage implements OnInit {
  peso: number | null = null;
  estado: string | null = null;
  altura: number | null = null;
  imc: number | null = null;
  mensaje: string = '';
  alertButtons = ['OK'];

  constructor() {}

  ngOnInit() {}

  calcularIMC() {
    this.estado = 'Normal';
    if (this.peso && this.altura) {
      const alturaMetros = this.altura / 100;
      this.imc = +(this.peso / (alturaMetros * alturaMetros)).toFixed(2);
      if (this.imc < 18.5) {
        this.estado = 'Bajo Peso';
      } else if (this.imc > 30) {
        this.estado = 'Obesidad';
      } else if (this.imc > 25) {
        this.estado = 'Sobrepeso';
      }
      this.mensaje = `Tu IMC es ${this.imc}`;
    } else {
      this.mensaje = 'Por favor ingresa peso y altura válidos.';
    }
  }
}
