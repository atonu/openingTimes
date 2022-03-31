import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  days = [
    {
      DayOfWeek:1,
      Open:true,
      From1:'03:00',
      To1:'05:00',
      From2:'06:00',
      To2:'08:00'
    },{
      DayOfWeek:2,
      Open:true,
      From1:'01:00',
      To1:'02:00',
      From2:'04:00',
      To2:'05:00'
    }
  ]
}
