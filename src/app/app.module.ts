import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule} from '@angular/core';

import { AppComponent } from './app.component';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatGridListModule, MatMenuModule, MatIconModule, MatToolbarModule, MatButtonModule, MatNativeDateModule, MatSidenavModule, MatListModule, MatInputModule, MatSelectModule, MatDatepickerModule, MatRadioModule, MatCardModule} from '@angular/material';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { WorkdaysFormComponent } from './workdays-form/workdays-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatMomentDateModule, MomentDateAdapter } from '@angular/material-moment-adapter';
import { FlexLayoutModule } from "@angular/flex-layout";
import {GridModule} from '@angular/flex-layout/grid';

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MM YYYY',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'MM YYYY',
  },
};
@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    WorkdaysFormComponent
  ],
  imports: [
    BrowserModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatGridListModule,
    MatMomentDateModule,
    FlexLayoutModule,
    GridModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pl' }, //you can change useValue
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
