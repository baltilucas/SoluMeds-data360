import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule} from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-ingresaralergia',
  templateUrl: './ingresaralergia.page.html',
  styleUrls: ['./ingresaralergia.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class IngresaralergiaPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
