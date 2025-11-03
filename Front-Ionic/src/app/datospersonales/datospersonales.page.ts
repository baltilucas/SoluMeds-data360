import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule} from '@ionic/angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-datospersonales',
  templateUrl: './datospersonales.page.html',
  styleUrls: ['./datospersonales.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule]
})
export class DatospersonalesPage implements OnInit {

  paciente: any = {};

  link = 'http://54.166.37.210:4000';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<any>(`${this.link}/pacientes/1`).subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          this.paciente = data[0];
        }
      },
      error: (err) => {
        console.error('Error cargando datos del paciente', err);
      }
    });
  }

}
