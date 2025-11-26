import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController } from '@ionic/angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-alergias',
  templateUrl: './alergias.page.html',
  styleUrls: ['./alergias.page.scss'],
  standalone: true,
  imports: [RouterLink, IonicModule, CommonModule, FormsModule, HttpClientModule],
})
export class AlergiasPage implements OnInit, OnDestroy {
  alergias: any[] = [];
  link = 'http://ec2-3-80-29-195.compute-1.amazonaws.com:4000';
  private intervalo: any;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    // Cargar la primera vez
    this.cargarAlergias();

    // Recargar cada 2 segundos
    this.intervalo = setInterval(() => {
      this.cargarAlergias();
    }, 2000);
  }

  ngOnDestroy() {
    // Limpiar el intervalo cuando se abandona la página
    if (this.intervalo) {
      clearInterval(this.intervalo);
    }
  }

  cargarAlergias() {
    this.http.get<any[]>(`${this.link}/alergiaspaciente/paciente/1`).subscribe({
      next: (data) => {
        this.alergias = data.map((item, index) => ({
          id: index + 1,
          titulo: item.nombre_alergia || '—',
          nivel: item.severidad || '',
          color: this.getColor(item.severidad || ''),
          descripcion: item.sintomas || '',
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
    } catch {
      return '';
    }
  }

  async addAlergia() {}
}
