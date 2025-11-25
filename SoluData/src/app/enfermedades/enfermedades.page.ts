import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonButton,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonCardSubtitle,
  IonButtons,
  IonBackButton
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-enfermedades',
  templateUrl: './enfermedades.page.html',
  styleUrls: ['./enfermedades.page.scss'],
  standalone: true,
  imports: [
      IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonButton,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonCardSubtitle,
  IonButtons,
  IonBackButton
  ],
})
export class EnfermedadesPage implements OnInit {
  constructor() {}

  ngOnInit() {}
}
