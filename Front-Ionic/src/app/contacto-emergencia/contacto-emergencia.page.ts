import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule} from '@ionic/angular';
@Component({
  selector: 'app-contacto-emergencia',
  templateUrl: './contacto-emergencia.page.html',
  styleUrls: ['./contacto-emergencia.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ContactoEmergenciaPage implements OnInit {

  contactos = [
  { id: 1, nombre: 'Camila Geldes', relacion: 'Pareja', numero: '+56966582707', correo: 'camila@gmail.com' },
  { id: 2, nombre: 'Javier Torres', relacion: 'Hermano', numero: '+56966582707', correo: 'javier.torres@gmail.com' },
  { id: 3, nombre: 'Lorena Rojas', relacion: 'Madre', numero: '+56966582707', correo: 'lorena.rojas@gmail.com' },
  { id: 4, nombre: 'Fernando Paredes', relacion: 'Padre', numero: '+56966582707', correo: 'fernando.paredes@gmail.com' },
];


  constructor() { }

  ngOnInit() {
  }

    llamar(numero: string) {
    window.location.href = `tel:${numero}`;
  }


}
