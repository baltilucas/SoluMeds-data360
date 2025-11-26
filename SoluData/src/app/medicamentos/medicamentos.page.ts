import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-medicamentos',
  templateUrl: './medicamentos.page.html',
  styleUrls: ['./medicamentos.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class MedicamentosPage implements OnInit {
  medicamentos = [
    {
      id: 1,
      nombre: 'Ibuprofeno',
      cantidad: 500,
      frecuencia: 8, // cada 8 horas
      funcion: 'Antiinflamatorio',
      doctor: 'Dr. Carlos Guzman',
      tipo: 'Temporal',
      duracion: 5, // días
    },
    {
      id: 2,
      nombre: 'Escitalopram',
      cantidad: 20,
      frecuencia: 12, // cada 12 horas
      funcion: 'Antidepresivo',
      doctor: 'Dra. Camila Geldes',
      tipo: 'Crónico',
      duracion: 30, // días
    },
    {
      id: 3,
      nombre: 'Amoxicilina',
      cantidad: 875,
      frecuencia: 12, // cada 12 horas
      funcion: 'Antibiótico',
      doctor: 'Dr. Jorge Ramírez',
      tipo: 'Temporal',
      duracion: 7,
    },
    {
      id: 4,
      nombre: 'Loratadina',
      cantidad: 10,
      frecuencia: 24, // una vez al día
      funcion: 'Antihistamínico',
      doctor: 'Dra. Paula Torres',
      tipo: 'Temporal',
      duracion: 10,
    },
    {
      id: 5,
      nombre: 'Metformina',
      cantidad: 850,
      frecuencia: 12, // cada 12 horas
      funcion: 'Antidiabético',
      doctor: 'Dr. Sebastián Molina',
      tipo: 'Crónico',
      duracion: 60,
    },
  ];

  constructor(private location: Location, private alertCtrl: AlertController) {}

  ngOnInit() {}

  goBack() {
    this.location.back();
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
