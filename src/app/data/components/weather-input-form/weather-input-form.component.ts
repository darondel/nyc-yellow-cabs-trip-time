import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChange,
  SimpleChanges,
  Type
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { debounceTime, distinctUntilChanged, filter, tap } from 'rxjs/operators';

import { WeatherInput, WeatherInputUnit } from '../../models/weather.model';

@Component({
  selector: 'app-weather-input-form',
  templateUrl: './weather-input-form.component.html',
  styleUrls: ['./weather-input-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherInputFormComponent<T extends WeatherInputUnit> implements OnChanges {

  @Input() weatherInput: WeatherInput<T>;
  @Input() units: Type<T>;
  @Input() title: string;

  @Output() weatherInputChange = new EventEmitter<WeatherInput<T>>();
  @Output() statusChange = new EventEmitter<string>();

  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.buildForm();
    this.formChanges();
  }

  ngOnChanges(changes: SimpleChanges) {
    const weatherInputChange: SimpleChange = changes.weatherInput;

    if (weatherInputChange) {
      this.form.patchValue(weatherInputChange.currentValue);
    }
  }

  /**
   * Builds the form with these controls:
   * <ul>
   * <li>Value: required.</li>
   * <li>Unit: required.</li>
   * </ul>
   */
  private buildForm() {
    this.form = this.formBuilder.group({
      value: ['', Validators.required],
      unit: ['', Validators.required]
    });
  }

  /**
   * Listens to form changes and emits an event:
   * <ul>
   * <li>When a value is updated by the user (see {@link FormGroup#dirty}) and is different from the previous one.</li>
   * <li>When the status is updated and is different from the previous one.</li>
   * </ul>
   */
  private formChanges() {
    this.form.valueChanges
      .pipe(
        filter(() => this.form.dirty),
        tap(() => this.form.markAsPristine()),
        debounceTime(500),
        distinctUntilChanged((weatherInput1, weatherInput2) => JSON.stringify(weatherInput1) === JSON.stringify(weatherInput2))
      )
      .subscribe(weatherInput => this.weatherInputChange.emit(weatherInput));

    this.form.statusChanges
      .pipe(distinctUntilChanged())
      .subscribe(status => this.statusChange.emit(status));
  }

}
