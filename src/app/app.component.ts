import {Component} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  days = [
    {
      DayOfWeek:1,
      Closed:false,
      From1:'03:00',
      To1:'05:00',
      From2:'06:00',
      To2:'08:00'
    },{
      DayOfWeek:2,
      Closed:true,
      From1:'01:00',
      To1:'02:00',
      From2:'04:00',
      To2:'05:00'
    },{
      DayOfWeek:2,
      Closed:true,
      From1:'01:00',
      To1:'02:00',
      From2:'04:00',
      To2:'05:00'
    },{
      DayOfWeek:2,
      Closed:false,
      From1:'01:00',
      To1:'02:00',
      From2:'04:00',
      To2:'05:00'
    },{
      DayOfWeek:2,
      Closed:false,
      From1:'01:00',
      To1:'02:00',
      From2:'04:00',
      To2:'05:00'
    },{
      DayOfWeek:2,
      Closed:true,
      From1:'01:00',
      To1:'02:00',
      From2:'04:00',
      To2:'05:00'
    },{
      DayOfWeek:2,
      Closed:true,
      From1:'01:00',
      To1:'02:00',
      From2:'04:00',
      To2:'05:00'
    }
  ]
  Form!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.initBookingForm()
  }

  initBookingForm(): void {
    this.Form = this.formBuilder.group({});
  }
  addChildForm(name: string, group: FormGroup) {
    this.Form.setControl(name, group);
    console.log(this.Form.getRawValue())
  }
}
