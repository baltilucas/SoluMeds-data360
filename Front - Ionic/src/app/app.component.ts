import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { IonicModule} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { library, playCircle, radio, search } from 'ionicons/icons';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonicModule, RouterLink],
})
export class AppComponent {
  constructor() {
    addIcons({ library, playCircle, radio, search });
  }


}
