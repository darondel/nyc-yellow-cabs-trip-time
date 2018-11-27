import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MatButtonModule,
  MatDateFormats,
  MatDatepickerModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule
} from '@angular/material';
import { MatMomentDateModule, MomentDateAdapter } from '@angular/material-moment-adapter';

import { Moment } from 'moment';

import { InformationFormComponent } from './components/information-form/information-form.component';
import { RoutePointFormComponent } from './components/route-point-form/route-point-form.component';
import { WeatherInputFormComponent } from './components/weather-input-form/weather-input-form.component';
import { InputDataComponent } from './containers/input-data/input-data.component';

/**
 * Moment.js date formats including time.
 */
export const MOMENT_DATE_FORMATS_WITH_TIME: MatDateFormats = {
  parse: {
    dateInput: 'LLL'
  },
  display: {
    dateInput: 'LLL',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LLL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};

/**
 * Moment.js date adapter including time.
 */
export class MomentDateAdapterWithTime extends MomentDateAdapter {

  compareDate(first: Moment, second: Moment): number {
    return first.valueOf() - second.valueOf();
  }

}

@NgModule({
  declarations: [
    InformationFormComponent,
    InputDataComponent,
    RoutePointFormComponent,
    WeatherInputFormComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatMomentDateModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapterWithTime},
    {provide: MAT_DATE_FORMATS, useValue: MOMENT_DATE_FORMATS_WITH_TIME}
  ],
  exports: [
    InputDataComponent
  ]
})
export class DataModule {
}
