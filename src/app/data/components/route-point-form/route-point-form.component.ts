import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { LatLngLiteral } from '@agm/core';

import { AbstractFormComponent } from '../abstract-form.component';

@Component({
  selector: 'app-route-point-form',
  templateUrl: './route-point-form.component.html',
  styleUrls: ['./route-point-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoutePointFormComponent extends AbstractFormComponent<LatLngLiteral> {

  @Input() title: string;
  @Input() icon: string;
  @Input() step: number;

  /**
   * Minimum latitude.
   */
  get minLatitude(): number {
    return -90;
  }

  /**
   * Maximum latitude.
   */
  get maxLatitude(): number {
    return 90;
  }

  /**
   * Minimum longitude.
   */
  get minLongitude(): number {
    return -180;
  }

  /**
   * Maximum longitude.
   */
  get maxLongitude(): number {
    return 180;
  }

  protected getFormControl(id: keyof LatLngLiteral): FormControl {
    switch (id) {
      case 'lat':
        return this.formBuilder.control('', [
          Validators.required,
          Validators.min(this.minLatitude),
          Validators.max(this.maxLatitude)
        ]);
      case 'lng':
        return this.formBuilder.control('', [
          Validators.required,
          Validators.min(this.minLongitude),
          Validators.max(this.maxLongitude)
        ]);
    }
    return undefined;
  }

}
