import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController } from '@ionic/angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-alergias',
  templateUrl: './alergias.page.html',
  styleUrls: ['./alergias.page.scss'],
  standalone: true,
  imports: [RouterLink ,IonicModule, CommonModule, FormsModule, HttpClientModule],
})
export class AlergiasPage implements OnInit {
  alergias: any[] = [];

  link = 'http://54.166.37.210:4000';

  constructor(
    private location: Location,
    private alertCtrl: AlertController,
    private http: HttpClient,
    private router: Router
  ) {}

ngOnInit() {
  this.http.get<any[]>(`${this.link}/alergiaspaciente/paciente/1`).subscribe({
    next: (data) => {
      this.alergias = data.map((item, index) => ({
        id: index + 1,
        // nombre de la alergia
        titulo: item.nombre_alergia || '—',
        // severidad tal como viene (p.ej. 'LEVE', 'MODERADO')
        nivel: item.severidad || '',
        // color para la etiqueta según severidad
        color: this.getColor(item.severidad || ''),
        // síntomas/descripcion proveniente del backend
        descripcion: item.sintomas || '',
        // fecha de diagnóstico: guardamos la original y una versión formateada
        fecha: item.fechaDiagnostico || null,
        fechaStr: this.formatDate(item.fechaDiagnostico),
      }));
    },
    error: (err) => {
      console.error('Error cargando alergias', err);
    },
  });
}


  irCrearAlergia() {
    this.router.navigate(['/crearalergia']);
  }

  getColor(nivel: string): string {
    if (!nivel) return 'medium';
    switch (nivel.toLowerCase()) {
      case 'grave':
        return 'danger';
      case 'moderado':
        return 'primary';
      case 'leve':
        return 'secondary';
      default:
        return 'medium';
    }
  }

  // Formatea una fecha ISO o similar a un string legible en español.
  formatDate(dateInput: string | null | undefined): string {
    try {
      if (!dateInput) return '';
      const d = new Date(dateInput);
      if (isNaN(d.getTime())) return '';
      return d.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch (e) {
      return '';
    }
  }

  async addAlergia() {}
}
