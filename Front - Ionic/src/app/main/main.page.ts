import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar,
  IonButtons,       
  IonMenuButton,    
  IonButton,
  IonInput         
} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
  standalone: true,
  imports: [
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar, 
  IonButtons,      
  IonMenuButton,   
  IonButton,       
  CommonModule, 
  FormsModule,
  IonInput, 
  RouterLink
]

})
export class MainPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}