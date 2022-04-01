import {Component} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {DAYS_SEED} from "../Constants/Constants";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  days = DAYS_SEED
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
