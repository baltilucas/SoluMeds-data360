import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonList,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonItemGroup,
  IonButtons,
  IonBackButton,
} from '@ionic/angular/standalone';
import { HttpClient, HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-datospaciente',
  templateUrl: './datospaciente.page.html',
  styleUrls: ['./datospaciente.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonList,
    IonItem,
    IonItemDivider,
    IonLabel,
    IonItemGroup,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonList,
    IonItem,
    IonItemDivider,
    IonLabel,
    IonItemGroup,
    IonButtons,
    IonBackButton,
    HttpClientModule,
  ],
})
export class DatospacientePage implements OnInit {
  paciente: any = {};

  link = 'http://ec2-3-80-29-195.compute-1.amazonaws.com:4000';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any>(`${this.link}/pacientes/1`).subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          this.paciente = data[0];
        }
      },
      error: (err) => {
        console.error('Error cargando datos del paciente', err);
      },
    });
  }
}
