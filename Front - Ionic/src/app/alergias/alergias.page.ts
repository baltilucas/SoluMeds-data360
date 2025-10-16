import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController } from '@ionic/angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { Router } from '@angular/router';
@Component({
  selector: 'app-alergias',
  templateUrl: './alergias.page.html',
  styleUrls: ['./alergias.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule],
})
export class AlergiasPage implements OnInit {
  alergias: any[] = [];

  link = 'http://localhost:4000/';

  constructor(
    private location: Location,
    private alertCtrl: AlertController,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.http.get<any[]>(`${this.link}/alergiaspaciente/paciente/1`).subscribe({
      next: (data) => {
        this.alergias = data.map((item, index) => ({
          id: index + 1,
          titulo: item.nombre_alergia,
          nivel: item.severidad,
          color: this.getColor(item.gravedad),
        }));
      },
      error: (err) => {
        console.error('Error cargando alergias', err);
      },
    });
  }

  irCrearAlergia() {
    this.router.navigate(['/crearalergia']);
  }

  getColor(nivel: string): string {
    switch (nivel.toLowerCase()) {
      case 'grave':
        return 'danger';
      case 'moderado':
        return 'primary';
      case 'leve':
        return 'secondary';
      default:
        return 'medium';
    }
  }

  goBack() {
    this.location.back();
  }

  async addAlergia() {}
}
