import { Component, EventEmitter, Input, OnChanges, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { Moment } from 'moment';

import { Information } from '../../models/information.model';

@Component({
  selector: 'app-information-form',
  templateUrl: './information-form.component.html',
  styleUrls: ['./information-form.component.css']
})
export class InformationFormComponent implements OnChanges {

  @Input() information: Information;
  @Input() minDepartureTime: Moment;
  @Input() minPassengerVolume: number;
  @Input() maxPassengerVolume: number;

  @Output() informationChange = new EventEmitter<Information>();
  @Output() statusChange = new EventEmitter<string>();

  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.buildForm();
    this.formChanges();
  }

  /**
   * All possible values enabled for the passenger volume.
   */
  get passengerVolumeValues(): number[] {
    return Array.from({
        length: this.maxPassengerVolume - this.minPassengerVolume + 1
      }, (v, k) => k + this.minPassengerVolume
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    const informationChange: SimpleChange = changes.information;

    if (informationChange && informationChange.currentValue) {
      this.form.patchValue(this.information, {emitEvent: false});
    }
  }

  /**
   * Builds the form with these controls:
   * <ul>
   * <li>Departure time: required.</li>
   * <li>Passenger volume: required and bounded (see {@link minPassengerVolume} and {@link maxPassengerVolume} inputs).</li>
   * </ul>
   */
  private buildForm() {
    this.form = this.formBuilder.group({
      departureTime: ['', Validators.required],
      passengerVolume: ['', [Validators.required, Validators.min(this.minPassengerVolume), Validators.max(this.maxPassengerVolume)]]
    });
  }

  /**
   * Listens to form changes and emits an event each a value or the status is updated.
   */
  private formChanges() {
    this.form.valueChanges
      .pipe(debounceTime(500))
      .subscribe(information => this.informationChange.emit(information));

    this.form.statusChanges
      .pipe(distinctUntilChanged())
      .subscribe(status => this.statusChange.emit(status))
  }

}
