import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonicModule,
  ActionSheetController,
  AlertController,
} from '@ionic/angular';

@Component({
  selector: 'app-examenes',
  templateUrl: './examenes.page.html',
  styleUrls: ['./examenes.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class ExamenesPage implements OnInit {
  examenes = [
    { tipo: 'Orina', fecha: '2025-09-10', hora: '08:30', detalle: 'Análisis general' },
    { tipo: 'Sangre', fecha: '2025-09-10', hora: '09:00', detalle: 'Hemograma completo' },
    { tipo: 'Orina', fecha: '2025-09-11', hora: '10:00', detalle: 'Proteinuria' },
    { tipo: 'Radiografía', fecha: '2025-09-12', hora: '11:00', detalle: 'Tórax' },
  ];

  examenesPorTipo: { [tipo: string]: any[] } = {};

  iconoPorTipo: { [tipo: string]: string } = {
    Orina: 'water-outline',
    Sangre: 'flask-outline',
    Radiografía: 'images-outline',
  };

  constructor(
    private actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.examenes.forEach((examen) => {
      if (!this.examenesPorTipo[examen.tipo]) {
        this.examenesPorTipo[examen.tipo] = [];
      }
      this.examenesPorTipo[examen.tipo].push(examen);
    });
  }

  get tiposExamen(): string[] {
    return Object.keys(this.examenesPorTipo);
  }

  async abrirOpciones(examen: any) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: `Opciones - ${examen.tipo}`,
      buttons: [
        {
          text: '📊 Ver Resultados',
          handler: () => this.mostrarResultados(examen),
        },
        {
          text: '📥 Descargar',
          handler: () => this.descargarExamen(),
        },
        {
          text: 'ℹ️ Más información',
          handler: () => this.mostrarInfo(examen),
        },
        {
          text: 'Cancelar',
          role: 'cancel',
        },
      ],
    });

    await actionSheet.present();
  }

  descargarExamen() {
    const link = document.createElement('a');
    link.href = 'assets/img/Xray_share.jpg';  
    link.download = 'examen.jpg';             
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  async mostrarInfo(examen: any) {
    const alert = await this.alertCtrl.create({
      header: `Examen de ${examen.tipo}`,
      subHeader: `${examen.fecha} - ${examen.hora}`,
      message: examen.detalle,
      buttons: ['OK'],
    });

    await alert.present();
  }

  async mostrarResultados(examen: any) {
    let resultadosFalsos = '';

    switch (examen.tipo) {
      case 'Sangre':
        resultadosFalsos = `
          Hemoglobina: 14.5 g/dL (Normal)<br>
          Glucosa: 110 mg/dL (Leve alto)<br>
          Leucocitos: 7,800 /mm³ (Normal)
        `;
        break;
      case 'Orina':
        resultadosFalsos = `
          pH: 6.0 (Normal)<br>
          Proteínas: Negativo<br>
          Glucosa: Negativo
        `;
        break;
      case 'Radiografía':
        resultadosFalsos = `
          Observación: Sin anomalías significativas<br>
          Comentario: Imagen compatible con tórax normal
        `;
        break;
      default:
        resultadosFalsos = 'No hay datos disponibles.';
    }

    const alert = await this.alertCtrl.create({
      header: `Resultados - ${examen.tipo}`,
      subHeader: `${examen.fecha} - ${examen.hora}`,
      message: resultadosFalsos,
      buttons: ['OK'],
    });

    await alert.present();
  }

  async subirExamen() {
    const alert = await this.alertCtrl.create({
      header: 'Subir examen',
      message: 'Aquí podrás cargar tus exámenes en futuras versiones.',
      buttons: ['OK'],
    });

    await alert.present();
  }
}
