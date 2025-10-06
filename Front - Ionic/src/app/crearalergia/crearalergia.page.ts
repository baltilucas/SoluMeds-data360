import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from "@ionic/angular";
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crearalergia',
  templateUrl: './crearalergia.page.html',
  styleUrls: ['./crearalergia.page.scss'],
  standalone: true,
  imports: [ CommonModule, FormsModule, IonicModule, HttpClientModule] // <-- agregué HttpClientModule
})
export class CrearalergiaPage implements OnInit {
  
   alergias: string[] = [
    "Polen", "Ácaros del polvo", "Látex", "Mariscos", "Maní",
    "Leche", "Huevo", "Soja", "Gluten", "Penicilina",
    "Picadura de abeja", "Cloro", "Niquel (metal)", "Perfumes", "Cápsulas de gelatina"
  ];
  alergiaSeleccionada: string = '';
  gravedadSeleccionada: string = '';

  constructor(private http: HttpClient,
    private router: Router
  ) { }


  ngOnInit() {}

  guardarAlergia() {
    if (!this.alergiaSeleccionada || !this.gravedadSeleccionada) {
      console.log('Debe seleccionar alergia y gravedad');
      return;
    }

    // Obtener índice + 1
    const index = this.alergias.indexOf(this.alergiaSeleccionada);
    if (index === -1) {
      console.error('Alergia no válida');
      return;
    }

    const numeroPaciente = index + 1;
    const url = `http://34.203.198.4:4000/api/alergias/paciente/${numeroPaciente}`;
    const body = { gravedad: this.gravedadSeleccionada };

    this.http.post(url, body).subscribe({
      next: (res) => {
        console.log('Alergia guardada:', res);

        this.router.navigate(['/alergias']);
      },
      error: (err) => {
        console.error('Error al guardar alergia:', err);
      }
    });
  }

}
