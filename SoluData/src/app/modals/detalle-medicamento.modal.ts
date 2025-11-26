// src/app/modals/detalle-medicamento.modal.ts
import { Component, Input } from '@angular/core';
import { ModalController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalle-medicamento-modal',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ nombre }}</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="cerrar()">Cerrar</ion-button>
        </ion-buttons>
      </ion-toolbar>
      <ion-subtitle>Medicamento: {{ principioActivo }}</ion-subtitle>
    </ion-header>

    <ion-content class="ion-padding">
      <ul>
        <li>Cantidad: {{ cantidad }} mg</li>
        <li>Frecuencia: cada {{ frecuencia }} horas</li>
        <li>Recetado Por: {{ doctor }}</li>
        <li>Periodo: {{ diasRestantes }} días restantes</li>
        <li>Duración: {{ tipo }}</li>
      </ul>
    </ion-content>
  `,
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class DetalleMedicamentoModal {
  @Input() nombre!: string;
  @Input() principioActivo!: string;
  @Input() cantidad!: number;
  @Input() frecuencia!: number;
  @Input() doctor!: string;
  @Input() diasRestantes!: number;
  @Input() tipo!: string;

  constructor(private modalCtrl: ModalController) {}

  cerrar() {
    this.modalCtrl.dismiss();
  }
}
