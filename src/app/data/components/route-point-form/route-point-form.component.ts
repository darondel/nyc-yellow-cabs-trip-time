import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { debounceTime, distinctUntilChanged, filter, tap } from 'rxjs/operators';

import { LatLngLiteral } from '@agm/core';

@Component({
  selector: 'app-route-point-form',
  templateUrl: './route-point-form.component.html',
  styleUrls: ['./route-point-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoutePointFormComponent implements OnChanges {

  @Input() routePoint: LatLngLiteral;
  @Input() title: string;
  @Input() icon: string;
  @Input() step: number;

  @Output() routePointChange = new EventEmitter<LatLngLiteral>();
  @Output() statusChange = new EventEmitter<string>();

  form: FormGroup;

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

  constructor(private formBuilder: FormBuilder) {
    this.buildForm();
    this.formChanges();
  }

  ngOnChanges(changes: SimpleChanges) {
    const routePointChange: SimpleChange = changes.routePoint;

    if (routePointChange) {
      this.form.patchValue(routePointChange.currentValue);
    }
  }

  /**
   * Builds the form with these controls:
   * <ul>
   * <li>Latitude: required and bounded (see {@link minLatitude} and {@link maxLatitude} fields).</li>
   * <li>Longitude: required and bounded (see {@link minLongitude} and {@link maxLongitude} fields).</li>
   * </ul>
   */
  private buildForm() {
    this.form = this.formBuilder.group({
      lat: ['', [Validators.required, Validators.min(this.minLatitude), Validators.max(this.maxLatitude)]],
      lng: ['', [Validators.required, Validators.min(this.minLongitude), Validators.max(this.maxLongitude)]]
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
        distinctUntilChanged((routePoint1, routePoint2) => JSON.stringify(routePoint1) === JSON.stringify(routePoint2))
      )
      .subscribe(routePoint => this.routePointChange.emit(routePoint));

    this.form.statusChanges
      .pipe(distinctUntilChanged())
      .subscribe(status => this.statusChange.emit(status));
  }

}
