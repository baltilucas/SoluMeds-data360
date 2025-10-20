import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonDatetime,
  IonSelectOption,
  IonSelect,
  IonInput,
  IonCardContent,
  IonCardTitle,
  IonCardHeader,
  IonLabel,
  IonItem,
  IonButton,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonModal,
  IonText,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-creador-paciente',
  templateUrl: './creador-paciente.page.html',
  styleUrls: ['./creador-paciente.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonDatetime,
    IonSelectOption,
    IonSelect,
    IonInput,
    IonCardContent,
    IonCardTitle,
    IonCardHeader,
    IonLabel,
    IonItem,
    IonButton,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonCard,
    IonModal
  ],
})
export class CreadorPacientePage implements OnInit {
  showModal = false;
  fechaNacimiento: string | null = null;

  constructor() {}

  ngOnInit() {}

  openCalendar() {
    this.showModal = true;
  }

  closeCalendar() {
    this.showModal = false;
  }

  selectDate(event: any) {
    this.fechaNacimiento = event.detail.value;
    this.showModal = false;
  }
}
