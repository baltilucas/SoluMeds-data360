import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-vacunas',
  templateUrl: './vacunas.page.html',
  styleUrls: ['./vacunas.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule],
})
export class VacunasPage implements OnInit, OnDestroy {
  vacunas: any[] = [];
  vacunasPorAnio: { [anio: string]: any[] } = {};
  link = 'http://ec2-3-80-29-195.compute-1.amazonaws.com:4000';
  private intervalo: any;

  constructor(private http: HttpClient) {}

ngOnInit() {
  this.cargarVacunas();

  // Refrescar cada 2 segundos como en medicamentos
  this.intervalo = setInterval(() => {
    this.cargarVacunas();
  }, 2000);
}


  ngOnDestroy() {
    if (this.intervalo) clearInterval(this.intervalo);
  }
  cargarVacunas() {
    this.http.get<any[]>(`${this.link}/consultaspaciente/vacunas/1`).subscribe({
      next: (data) => {
        this.vacunas = data.map((item, index) => ({
          id: index + 1,
          fecha: item.fecha ? new Date(item.fecha) : null,
          nombre: item.nombre || '—',
          proveedor: item.proveedor || '—',
          sede: item.sede || '—',
        }));

        // Organizar por año
        this.vacunasPorAnio = {};
        this.vacunas.forEach((vacuna) => {
          const anio = vacuna.fecha?.getFullYear().toString() || '—';
          if (!this.vacunasPorAnio[anio]) this.vacunasPorAnio[anio] = [];
          this.vacunasPorAnio[anio].push(vacuna);
        });
      },
      error: (err) => {
        console.error('Error cargando vacunas', err);
      },
    });
  }

  get anios(): string[] {
    return Object.keys(this.vacunasPorAnio).sort(
      (a, b) => parseInt(b) - parseInt(a)
    );
  }

  descargarVacuna(vacuna: any) {
    const info = `Vacuna: ${vacuna.nombre}\nProveedor: ${
      vacuna.proveedor
    }\nSede: ${vacuna.sede}\nFecha: ${vacuna.fecha.toLocaleDateString()}`;
    const blob = new Blob([info], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${vacuna.nombre}-${vacuna.fecha.getFullYear()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
