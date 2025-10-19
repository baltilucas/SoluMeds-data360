import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-clicker',
  templateUrl: './clicker.page.html',
  styleUrls: ['./clicker.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ClickerPage implements OnInit {

  tiempoRestante: number | null = null;
  private intervalo: any = null;

  constructor(private alertCtrl: AlertController) {}

  ngOnInit() {}

  iniciarContador() {

    if (this.intervalo) {
      clearInterval(this.intervalo);
      this.intervalo = null;
    }
    this.tiempoRestante = 10;

    this.intervalo = setInterval(() => {
      if (this.tiempoRestante !== null && this.tiempoRestante > 0) {
        this.tiempoRestante--;
      } else {
        clearInterval(this.intervalo);
        this.intervalo = null;
        this.tiempoRestante = null;
        this.pedirNumero();
      }
    }, 1000);
  }

  async pedirNumero() {
    const alert = await this.alertCtrl.create({
      header: 'Ingrese un número',
      inputs: [
        {
          name: 'numero',
          type: 'number',
          placeholder: 'Escribe un número'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Aceptar',
          handler: async (data) => {
            const valor = Number(data.numero);
            if (!isNaN(valor)) {
              const pulso = valor * 6;
              const resultadoAlert = await this.alertCtrl.create({
                header: 'Resultado',
                message: `El pulso es ${pulso} pulsaciones por minuto`,
                buttons: ['OK']
              });
              await resultadoAlert.present();
            }
          }
        }
      ]
    });

    await alert.present();
  }
}
