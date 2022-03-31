import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {CommonModule} from "@angular/common";
import {MatOptionModule} from "@angular/material/core";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatSelectModule} from "@angular/material/select";
import {MatIconModule} from "@angular/material/icon";
import {OpeningTimesComponent} from './opening-times/opening-times.component';

@NgModule({
  declarations: [
    AppComponent,
    OpeningTimesComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    ReactiveFormsModule,
    MatOptionModule,
    FlexLayoutModule,
    MatSelectModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
