import { ChangeDetectionStrategy, Component, Input, Type } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { AbstractFormComponent } from '../abstract-form.component';
import { WeatherInputUnit } from '../../models/weather.model';

@Component({
  selector: 'app-weather-input-form',
  templateUrl: './weather-input-form.component.html',
  styleUrls: ['./weather-input-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherInputFormComponent<T extends WeatherInputUnit> extends AbstractFormComponent<T> {

  @Input() units: Type<T>;
  @Input() title: string;

  protected getFormControl(id: keyof T): FormControl {
    switch (id) {
      case 'value':
        return this.formBuilder.control('', Validators.required);
      case 'unit':
        return this.formBuilder.control('', Validators.required);
    }
  }

}
