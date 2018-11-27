import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { debounceTime, distinctUntilChanged, filter, tap } from 'rxjs/operators';

import { Moment } from 'moment';

import { Information } from '../../models/information.model';

@Component({
  selector: 'app-information-form',
  templateUrl: './information-form.component.html',
  styleUrls: ['./information-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InformationFormComponent implements OnChanges {

  @Input() information: Information;
  @Input() minDepartureTime: Moment;
  @Input() minPassengerVolume: number;
  @Input() maxPassengerVolume: number;

  @Output() informationChange = new EventEmitter<Information>();
  @Output() statusChange = new EventEmitter<string>();

  form: FormGroup;

  /**
   * Values allowed for the passenger volume, ranged between {@link minPassengerVolume} and {@link maxPassengerVolume}, both included.
   */
  get passengerVolumeValues(): number[] {
    return Array.from({
        length: this.maxPassengerVolume - this.minPassengerVolume + 1
      }, (v, k) => k + this.minPassengerVolume
    );
  }

  constructor(private formBuilder: FormBuilder) {
    this.buildForm();
    this.formChanges();
  }

  ngOnChanges(changes: SimpleChanges) {
    const informationChange: SimpleChange = changes.information;

    if (informationChange) {
      this.form.patchValue(informationChange.currentValue);
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
        distinctUntilChanged((information1, information2) => JSON.stringify(information1) === JSON.stringify(information2))
      )
      .subscribe(information => this.informationChange.emit(information));

    this.form.statusChanges
      .pipe(distinctUntilChanged())
      .subscribe(status => this.statusChange.emit(status));
  }

}
