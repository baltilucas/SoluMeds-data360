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
  
  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {}

  ingresarAlergia() {
    if (!this.alergeno) {
      alert('Debe ingresar un alérgeno');
      return;
    }

    const idPaciente = 1; // luego puedes traerlo del storage o login
    const fechaDiagnostico = new Date().toISOString().split('T')[0];

    const body = {
      idSeveridad: this.severidad,
      sintomas: this.sintomas,
      fechaDiagnostico
    };

    // 👉 IMPORTANTE: usar backticks para template literal
    const url = `http://ec2-3-80-29-195.compute-1.amazonaws.com:4000/alergiaspaciente/ingreso/${idPaciente}/${this.alergeno}`;

    this.http.post(url, body).subscribe({
      next: (res) => {
        console.log('Alergia ingresada correctamente', res);
        this.router.navigate(['/alergias']);
      },
      error: (err) => {
        console.error('Error al ingresar la alergia', err);
      }
    });
  }
}

