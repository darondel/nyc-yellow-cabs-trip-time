import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { Moment } from 'moment';

import { AbstractFormComponent } from '../abstract-form.component';
import { Information } from '../../models/information.model';

@Component({
  selector: 'app-information-form',
  templateUrl: './information-form.component.html',
  styleUrls: ['./information-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InformationFormComponent extends AbstractFormComponent<Information> {

  @Input() minDepartureTime: Moment;
  @Input() minPassengerVolume: number;
  @Input() maxPassengerVolume: number;

  /**
   * Values allowed for the passenger volume, ranged between {@link minPassengerVolume} and {@link maxPassengerVolume}, both included.
   */
  get passengerVolumeValues(): number[] {
    return Array.from({
        length: this.maxPassengerVolume - this.minPassengerVolume + 1
      }, (v, k) => k + this.minPassengerVolume
    );
  }

  /**
   * @inheritDoc
   */
  protected getFormControl(id: keyof Information): FormControl {
    switch (id) {
      case 'departureTime':
        return this.formBuilder.control('', Validators.required);
      case 'passengerVolume':
        return this.formBuilder.control('', [
          Validators.required,
          Validators.min(this.minPassengerVolume),
          Validators.max(this.maxPassengerVolume)
        ]);
    }
  }

}
