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
  IonList,
} from '@ionic/angular/standalone';
import { HttpClient, HttpClientModule } from '@angular/common/http';

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
    IonList,
    HttpClientModule,
  ],
})
export class IntervencionesPage implements OnInit {
  intervenciones: any[] = [];  // Cambié el nombre de alergias a intervenciones
  link = 'http://ec2-3-80-29-195.compute-1.amazonaws.com:4000';

  constructor(
    private http: HttpClient,
  ) {}

  ngOnInit() {
    this.cargarIntervenciones();  // Asegúrate de llamar a la función aquí
  }

  cargarIntervenciones() {
    this.http.get<any[]>(`${this.link}/consultaspaciente/intervenciones/1`).subscribe({
      next: (data) => {
        this.intervenciones = data.map((item, index) => ({
          id: index + 1,
          intervencion: item.Intervención || '—',
          doctor: item.Doctor || 'Desconocido',
          fecha: item.Fecha || null,
          hora: item.Hora || '—',
          fechaStr: this.formatDate(item.Fecha), // Si es necesario, ajusta este formato
        }));
      },
      error: (err) => {
        console.error('Error cargando intervenciones', err);
      },
    });
  }

  // Si necesitas una función para formatear la fecha
  formatDate(dateStr: string): string {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }
}

