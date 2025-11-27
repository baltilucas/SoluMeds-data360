import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import {
  IonContent, IonHeader, IonTitle, IonToolbar,
  IonCard, IonButton, IonCardHeader, IonCardTitle,
  IonCardContent, IonCardSubtitle, IonButtons, IonBackButton
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-enfermedades',
  templateUrl: './enfermedades.page.html',
  styleUrls: ['./enfermedades.page.scss'],
  standalone: true,
  imports: [
    IonContent,CommonModule, IonHeader, IonTitle, IonToolbar,
    IonCard, IonButton, IonCardHeader, IonCardTitle,
    IonCardContent,HttpClientModule, IonCardSubtitle, IonButtons, IonBackButton
  ],
})
export class EnfermedadesPage implements OnInit, OnDestroy {

  enfermedades: any[] = [];
  link = 'http://ec2-3-80-29-195.compute-1.amazonaws.com:4000';
  private intervalo: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.cargarEnfermedades();

    this.intervalo = setInterval(() => {
      this.cargarEnfermedades();
    }, 2000);
  }

  ngOnDestroy() {
    if (this.intervalo) {
      clearInterval(this.intervalo);
    }
  }

  cargarEnfermedades() {
    this.http.get<any[]>(`${this.link}/consultaspaciente/enfermedades/1`)
      .subscribe({
        next: (data) => {
          this.enfermedades = data.map((item, index) => ({
            id: index + 1,
            titulo: item.nombreEnfermedad || '—',
            idEnfermedadCronica: item.idEnfermedadCronica || '',
            fecha: item.fechaDiagnostico,
            fechaStr: this.formatDate(item.fechaDiagnostico),
          }));
        },
        error: (err) => {
          console.error('Error cargando enfermedades', err);
        },
      });
  }

  formatDate(date: string | null) {
    if (!date) return '';
    return new Date(date).toLocaleDateString('es-CL');
  }
}
