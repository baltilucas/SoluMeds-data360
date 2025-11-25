import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonButtons,
  IonBackButton,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-intervenciones',
  templateUrl: './intervenciones.page.html',
  styleUrls: ['./intervenciones.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonButtons,
    IonBackButton,
  ],
})
export class IntervencionesPage implements OnInit {
  constructor() {}

  ngOnInit() {}
}
