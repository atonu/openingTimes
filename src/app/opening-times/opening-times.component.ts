import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TIMES_SEED, WEEKLY_DAYS} from "../../Constants/Constants";
import {DayOfWeek} from "../../Models/DayOfWeek";

@Component({
  selector: 'app-opening-times',
  templateUrl: './opening-times.component.html',
  styleUrls: ['./opening-times.component.scss']
})
export class OpeningTimesComponent implements OnInit {
  @Output() formReady = new EventEmitter<FormGroup>();
  @Input() defaultValues: DayOfWeek[] = [];
  form!: FormGroup;
  days = WEEKLY_DAYS
  times = TIMES_SEED
  doubleShifts: boolean[] = [false, false, false, false, false, false, false];
  daysSelected!: number;
  disableForm = false;

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
    this.initForm();
    this.daysSelected = 0;
    setTimeout(() => {
      for (let i = 0; i < this.days.length; i++) {
        this.doubleShifts[i] = this.form.controls['OpeningTimes'].get([i])?.get('From2')?.value !== null;
        if (!this.form.controls['OpeningTimes'].get([i])?.get('Closed')?.value) {
          this.daysSelected++;
        }
      }
    }, 500);
    if (this.defaultValues.length!==0) {
      this.subscribeFormControls();
    }
    this.days.forEach((day) => {
      const openingTimeDay = this.fb.group({
        DayOfWeek: [day.Number, Validators.required],
        Closed: [true],
        From1: ['08:00'],
        To1: ['13:00'],
        From2: ['14:00'],
        To2: ['20:00'],
      });
      this.OpeningTimes.push(openingTimeDay);
    });
    if (
      this.defaultValues.length!==0
    ) {
      this.resetOpeningTimes();
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
    dayTime?.get('Closed')?.setValue(!dayTime?.get('Closed')?.value);
    if (!dayTime?.get('Closed')?.value) {
      this.daysSelected++;
    } else {
      this.daysSelected--;
    }
  }

  copyToAll() {
    let dayTime;
    let doubleShift = false;
    for (let i = 0; i < this.form.controls['OpeningTimes'].value.length; i++) {
      if (!this.form.controls['OpeningTimes'].get([i])?.get('Closed')?.value) {
        dayTime = this.form.controls['OpeningTimes'].get([i]);
        doubleShift = this.doubleShifts[i];
        break;
      }
    }
    for (let i = 0; i < this.form.controls['OpeningTimes'].value.length; i++) {
      if (!this.form.controls['OpeningTimes'].get([i])?.get('Closed')?.value) {
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

  resetOpeningTimes() {
    this.OpeningTimes.setValue(this.defaultValues);
  }

  private subscribeFormControls() {
    this.form.valueChanges.subscribe((change) => {
      if (change.OpeningTimes.length !== this.defaultValues.length) {
        this.disableForm = false;
      } else {
        this.disableForm = true;
        for (let i = 0; i < this.defaultValues.length; i++) {
          if (
            this.defaultValues[i].From1 != change.OpeningTimes[i].From1 ||
            this.defaultValues[i].From2 != change.OpeningTimes[i].From2 ||
            this.defaultValues[i].To1 != change.OpeningTimes[i].To1 ||
            this.defaultValues[i].To2 != change.OpeningTimes[i].To2 ||
            this.defaultValues[i].Closed != change.OpeningTimes[i].Closed
          ) {
            this.disableForm = false;
          }
        }
      }
    });
  }
}
