import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule} from '@ionic/angular';
@Component({
  selector: 'app-clima',
  templateUrl: './clima.page.html',
  styleUrls: ['./clima.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ClimaPage implements OnInit {

  weatherData = {
    today: {
      temperature: Math.floor(15 + Math.random()*20),
      description: 'Soleado',
      humidity: Math.floor(20 + Math.random()*50),
      windSpeed: Math.floor(2 + Math.random()*8)
    },
    tomorrow: {
      temperature: Math.floor(15 + Math.random()*20),
      description: 'Parcialmente nublado',
      humidity: Math.floor(20 + Math.random()*50),
      windSpeed: Math.floor(2 + Math.random()*8)
    }
  };

  constructor() { }

  ngOnInit() {}

}
