import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-opening-times',
  templateUrl: './opening-times.component.html',
  styleUrls: ['./opening-times.component.scss']
})
export class OpeningTimesComponent implements OnInit {
  @Output() formReady = new EventEmitter<FormGroup>();
  @Input() defaultValues: any = null;
  form!: FormGroup;
  days = [
    { Name: 'Monday', Number: 1 },
    { Name: 'Tuesday', Number: 2 },
    { Name: 'Wednesday', Number: 3 },
    { Name: 'Thursday', Number: 4 },
    { Name: 'Friday', Number: 5 },
    { Name: 'Saturday', Number: 6 },
    { Name: 'Sunday', Number: 7 },
  ];
  times = [
    '00:00',
    '01:00',
    '02:00',
    '03:00',
    '04:00',
    '05:00',
    '06:00',
    '07:00',
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
    '21:00',
    '22:00',
    '23:00',
  ];
  doubleShifts: boolean[] = [false, false, false, false, false, false, false];
  daysSelected: number =0;

  constructor(private fb: FormBuilder) {
  }

  get OpeningTimes() {
    return this.form.controls['OpeningTimes'] as FormArray;
  }

  get SearchWords() {
    return this.form.get('SearchWords');
  }

  get BusinessCategories() {
    return this.form.get('BusinessCategories');
  }

  async ngOnInit() {
    this.daysSelected = 0;
    this.initForm();
    setTimeout(() => {
      for (let i = 0; i < this.days.length; i++) {
        this.doubleShifts[i] = this.form.controls['OpeningTimes'].get([i])?.get('From2')?.value !== null;
        if (this.form.controls['OpeningTimes'].get([i])?.get('Open')?.value) {
          this.daysSelected++;
        }
        console.log(this.daysSelected);
      }
    }, 500);
    if (
      this.defaultValues
    ) {
      this.defaultValues.forEach((day: any) => {
        const openingTimeDay = this.fb.group({
          DayOfWeek: [day['DayOfWeek']],
          Open: [day['Open']],
          From1: [day['From1']],
          To1: [day['To1']],
          From2: [day['From2']],
          To2: [day['To2']],
        });
        this.OpeningTimes.push(openingTimeDay);
      });
    } else {
      this.days.forEach((day) => {
        const openingTimeDay = this.fb.group({
          DayOfWeek: [day.Number, Validators.required],
          Open: [false],
          From1: ['08:00'],
          To1: ['13:00'],
          From2: ['14:00'],
          To2: ['20:00'],
        });
        this.OpeningTimes.push(openingTimeDay);
      });
    }
    this.formReady.emit(this.form);
  }

  initForm() {
    this.form = this.fb.group({
      OpeningTimes: this.fb.array([]),
    });
  }

  remove(keyword: string): void {
    const index = this.SearchWords?.value.indexOf(keyword);

    if (index >= 0) {
      this.SearchWords?.value.splice(index, 1);
      this.SearchWords?.updateValueAndValidity();
    }
  }

  setDayAvailability(index: number) {
    const dayTime = this.form.controls['OpeningTimes'].get([index]);
    dayTime?.get('Open')?.setValue(!dayTime?.get('Open')?.value);
    if (dayTime?.get('Open')?.value) {
      this.daysSelected++;
    } else {
      this.daysSelected--;
    }
  }

  copyToAll() {
    let dayTime;
    let doubleShift = false;
    for (let i = 0; i < this.form.controls['OpeningTimes'].value.length; i++) {
      if (this.form.controls['OpeningTimes'].get([i])?.get('Open')?.value) {
        dayTime = this.form.controls['OpeningTimes'].get([i]);
        doubleShift = this.doubleShifts[i];
        break;
      }
    }
    for (let i = 0; i < this.form.controls['OpeningTimes'].value.length; i++) {
      if (this.form.controls['OpeningTimes'].get([i])?.get('Open')?.value) {
        this.form.controls['OpeningTimes'].get([i])?.get('From1')?.setValue(dayTime?.value.From1);
        this.form.controls['OpeningTimes'].get([i])?.get('To1')?.setValue(dayTime?.value.To1);
        if (doubleShift) {
          this.form.controls['OpeningTimes'].get([i])?.get('From2')?.setValue(dayTime?.value.From2);
          this.form.controls['OpeningTimes'].get([i])?.get('To2')?.setValue(dayTime?.value.To2);
        }
        this.doubleShifts[i] = doubleShift;
      }
    }
  }
}
