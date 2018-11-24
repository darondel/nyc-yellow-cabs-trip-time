import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
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
    RoutePointFormComponent
  ],
  imports: [
    CommonModule,
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
  ]
})
export class DataModule {
}
