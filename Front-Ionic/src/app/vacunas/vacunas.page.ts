import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-vacunas',
  templateUrl: './vacunas.page.html',
  styleUrls: ['./vacunas.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class VacunasPage implements OnInit {
  vacunas = [
    { id: 1, fecha: new Date('2024-01-31'), nombre: 'Anual Influenza', proveedor: 'Pfizer', sede: 'Cesfam Garín' },
    { id: 2, fecha: new Date('2023-05-12'), nombre: 'COVID-19 Refuerzo', proveedor: 'Moderna', sede: 'Cesfam Centro' },
    { id: 3, fecha: new Date('2022-11-03'), nombre: 'Hepatitis B', proveedor: 'GSK', sede: 'Cesfam Norte' },
    { id: 4, fecha: new Date('2021-07-19'), nombre: 'Tétanos', proveedor: 'Sanofi', sede: 'Cesfam Sur' },
    { id: 5, fecha: new Date('2020-03-28'), nombre: 'Varicela', proveedor: 'MSD', sede: 'Cesfam Centro' },
    { id: 6, fecha: new Date('2019-10-14'), nombre: 'Influenza', proveedor: 'Pfizer', sede: 'Cesfam Garín' },
    { id: 7, fecha: new Date('2021-12-01'), nombre: 'Sarampión', proveedor: 'GSK', sede: 'Cesfam Norte' },
    { id: 8, fecha: new Date('2022-06-08'), nombre: 'COVID-19 Inicial', proveedor: 'Pfizer', sede: 'Cesfam Sur' },
    { id: 9, fecha: new Date('2023-09-22'), nombre: 'Difteria', proveedor: 'Sanofi', sede: 'Cesfam Centro' },
    { id: 10, fecha: new Date('2020-08-16'), nombre: 'HPV', proveedor: 'MSD', sede: 'Cesfam Norte' }
  ];

  vacunasPorAnio: { [anio: string]: any[] } = {};

  constructor() {}

  ngOnInit() {
    this.vacunas.forEach((vacuna) => {
      const anio = vacuna.fecha.getFullYear().toString();
      if (!this.vacunasPorAnio[anio]) {
        this.vacunasPorAnio[anio] = [];
      }
      this.vacunasPorAnio[anio].push(vacuna);
    });
  }

  get anios(): string[] {
    return Object.keys(this.vacunasPorAnio).sort((a, b) => parseInt(b) - parseInt(a));
  }

  descargarVacuna(vacuna: any) {
    const info = `Vacuna: ${vacuna.nombre}\nProveedor: ${vacuna.proveedor}\nSede: ${vacuna.sede}\nFecha: ${vacuna.fecha.toLocaleDateString()}`;
    const blob = new Blob([info], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${vacuna.nombre}-${vacuna.fecha.getFullYear()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
