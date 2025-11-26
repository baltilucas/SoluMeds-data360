import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterLink,
    HttpClientModule,
  ],
})
export class HomePage {
  alergias: any[] = [];
  medicamentos: any[] = [];
  link = 'http://ec2-3-80-29-195.compute-1.amazonaws.com:4000';
  private intervalo: any;
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.cargarAlergias();
    this.cargarMedicamentos();
  }

  cargarAlergias() {
    this.http.get<any[]>(`${this.link}/alergiaspaciente/paciente/1`).subscribe({
      next: (data) => {
        const lista = data.map((item, index) => ({
          id: index + 1,
          titulo: item.nombre_alergia || '—',
        }));

        // 👉 solo mostrar las TRES primeras alergias
        this.alergias = lista.slice(0, 3);
      },
      error: (err) => {
        console.error('Error cargando alergias', err);
      },
    });
  }

  cargarMedicamentos() {
    this.http
      .get<any[]>(`${this.link}/consultaspaciente/medicamento/1`)
      .subscribe({
        next: (data) => {
          const lista = data.map((item, index) => ({
            id: index + 1,
            nombre: item.nombre || '—',
            dosis: item.dosis ?? '',
          }));

          this.medicamentos = lista.slice(0, 3);
        },
        error: (err) => {
          console.error('Error cargando medicamentos', err);
        },
      });
  }
}
