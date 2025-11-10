import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ingresaralergia',
  templateUrl: './ingresaralergia.page.html',
  styleUrls: ['./ingresaralergia.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    HttpClientModule 
  ]
})
export class IngresaralergiaPage implements OnInit {
  alergeno: string = '';
  severidad: number = 1;
  sintomas: string = '';
  idAlergia: number | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {}

  ingresarAlergia() {
    const idAlergia = Number(this.alergeno);
    if (!idAlergia || isNaN(idAlergia)) {
      alert('El campo Alérgeno debe ser un número (ID de alergia)');
      return;
    }
    const idPaciente = 1;
    const fechaDiagnostico = new Date().toISOString().split('T')[0]; // yyyy-mm-dd
    const body = {
      idPaciente,
      idAlergia,
      idSeveridad: this.severidad,
      sintomas: this.sintomas,
      fechaDiagnostico
    };
    this.http.post('http://ec2-3-231-209-50.compute-1.amazonaws.com:4000/alergiaspaciente', body).subscribe({
      next: (res) => {
        console.log('Alergia ingresada correctamente');
        this.router.navigate(['/alergias']);

      },
      error: (err) => {
        console.log('Error al ingresar la alergia');
      }
    });
  }
}
