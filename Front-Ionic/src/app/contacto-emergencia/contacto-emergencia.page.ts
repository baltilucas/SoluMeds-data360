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
  { id: 1, nombre: 'Camila Geldes', relacion: 'Pareja', numero: '+56924318769', correo: 'camila@gmail.com' },
  { id: 2, nombre: 'Javier Torres', relacion: 'Hermano', numero: '+56987654321', correo: 'javier.torres@gmail.com' },
  { id: 3, nombre: 'Lorena Rojas', relacion: 'Madre', numero: '+56991234567', correo: 'lorena.rojas@gmail.com' },
  { id: 4, nombre: 'Fernando Paredes', relacion: 'Padre', numero: '+56999887766', correo: 'fernando.paredes@gmail.com' },
  { id: 5, nombre: 'Valentina Soto', relacion: 'Amiga', numero: '+56933445566', correo: 'valentina.soto@gmail.com' },
  { id: 6, nombre: 'Diego Castillo', relacion: 'Amigo', numero: '+56922334455', correo: 'diego.castillo@gmail.com' },
  { id: 7, nombre: 'María López', relacion: 'Tía', numero: '+56988776655', correo: 'maria.lopez@gmail.com' },
  { id: 8, nombre: 'Andrés Medina', relacion: 'Primo', numero: '+56977665544', correo: 'andres.medina@gmail.com' },
  { id: 9, nombre: 'Catalina Rivas', relacion: 'Prima', numero: '+56966554433', correo: 'catalina.rivas@gmail.com' },
  { id: 10, nombre: 'Sebastián Vargas', relacion: 'Amigo', numero: '+56955443322', correo: 'sebastian.vargas@gmail.com' },
  { id: 11, nombre: 'Paula Fuentes', relacion: 'Compañera de trabajo', numero: '+56944332211', correo: 'paula.fuentes@gmail.com' },
  { id: 12, nombre: 'Rodrigo Salazar', relacion: 'Vecino', numero: '+56933221100', correo: 'rodrigo.salazar@gmail.com' },
  { id: 13, nombre: 'Florencia Bravo', relacion: 'Sobrina', numero: '+56922110099', correo: 'florencia.bravo@gmail.com' },
  { id: 14, nombre: 'Cristian Rojas', relacion: 'Amigo', numero: '+56911009988', correo: 'cristian.rojas@gmail.com' },
  { id: 15, nombre: 'Isabella Reyes', relacion: 'Hermana', numero: '+56900998877', correo: 'isabella.reyes@gmail.com' }
];


  constructor() { }

  ngOnInit() {
  }

}
