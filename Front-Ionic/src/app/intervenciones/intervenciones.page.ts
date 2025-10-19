import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule} from '@ionic/angular';

@Component({
  selector: 'app-intervenciones',
  templateUrl: './intervenciones.page.html',
  styleUrls: ['./intervenciones.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class IntervencionesPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
