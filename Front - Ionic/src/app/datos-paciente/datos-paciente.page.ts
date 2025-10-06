import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IonicModule} from '@ionic/angular';

@Component({
  selector: 'app-datos-paciente',
  templateUrl: './datos-paciente.page.html',
  styleUrls: ['./datos-paciente.page.scss'],
  standalone: true,
  imports: [IonicModule, 
  CommonModule, 
  FormsModule,
  RouterLink 
]
})
export class DatosPacientePage implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }

  goBack() {
    this.location.back();  
  }


}
