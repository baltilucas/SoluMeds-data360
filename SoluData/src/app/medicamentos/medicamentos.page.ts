import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController } from '@ionic/angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-medicamentos',
  templateUrl: './medicamentos.page.html',
  styleUrls: ['./medicamentos.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterLink,
  ],
})
export class MedicamentosPage implements OnInit, OnDestroy {
  medicamentos: any[] = [];
  link = 'http://ec2-3-80-29-195.compute-1.amazonaws.com:4000';
  private intervalo: any;

  constructor(
    private location: Location,
    private alertCtrl: AlertController,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    // Cargar la primera vez
    this.cargarMedicamentos();

    // Recargar cada 2 segundos
    this.intervalo = setInterval(() => {
      this.cargarMedicamentos();
    }, 2000);
  }
    ngOnDestroy() {
    // Limpiar el intervalo cuando se abandona la página
    if (this.intervalo) {
      clearInterval(this.intervalo);
    }
  }

cargarMedicamentos() {
  this.http.get<any[]>(`${this.link}/consultaspaciente/medicamento/1`).subscribe({
    next: (data) => {
      this.medicamentos = data.map((item, index) => {
        const dias = item.diasRestantes ?? 0;

        return {
          id: index + 1,
          doctor: item.nombreDoctor || '—',
          fechaReceta: item.fechaReceta || null,
          fechaRecetaStr: this.formatDate(item.fechaReceta),
          medicamento: item.nombre || '—',
          dosis: item.dosis || '',
          formato: item.formato || '',
          frecuencia: item.frecuencia || '',
          horaInicio: item.horaInicio || '',
          finalReceta: item.finalReceta || null,
          finalRecetaStr: this.formatDate(item.finalReceta),
          diasRestantes: dias,

          // ✔️ Nuevo campo
          tipo: dias > 25 ? 'Crónico' : 'Temporal',
        };
      });
    },
    error: (err) => {
      console.error('Error cargando medicamentos', err);
    },
  });
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

  async verDetalles(alergia: any) {
    const { id, ...infoSinId } = alergia;

    const mensaje = `Cantidad: ${infoSinId.cantidad} mg
       Frecuencia: cada ${infoSinId.frecuencia} horas
       Recetado Por: ${infoSinId.doctor}
       periodo: ${infoSinId.duracion} dias
       Duración: ${infoSinId.tipo}`;

    const alert = await this.alertCtrl.create({
      header: infoSinId.nombre,
      subHeader: `Tipo: ${infoSinId.funcion}`,
      message: mensaje,
      buttons: ['Cerrar'],
    });

    await alert.present();
  }
}
