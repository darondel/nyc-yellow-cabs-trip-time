import { Directive, Host, Input, OnInit, Optional, Self } from '@angular/core';

import { AbstractFormComponent } from '../components/abstract-form.component';
import { InformationFormComponent } from '../components/information-form/information-form.component';
import { RoutePointFormComponent } from '../components/route-point-form/route-point-form.component';
import { WeatherInputFormComponent } from '../components/weather-input-form/weather-input-form.component';
import { environment } from '../../../environments/environment';

@Directive({
  selector: 'app-information-form[appConfiguredForm],app-route-point-form[appConfiguredForm],app-weather-input-form[appConfiguredForm]'
})
export class ConfiguredFormDirective implements OnInit {

  @Input() formId: string;

  constructor(@Host() @Self() @Optional() private informationForm: InformationFormComponent,
              @Host() @Self() @Optional() private routePointForm: RoutePointFormComponent,
              @Host() @Self() @Optional() private weatherInputForm: WeatherInputFormComponent<any>) {
  }

  /**
   * @inheritDoc
   */
  ngOnInit(): void {
    if (this.informationForm) {
      this.setCommonEnvironment(this.informationForm);
      this.setInformationEnvironment(this.informationForm);
    } else if (this.routePointForm) {
      this.setCommonEnvironment(this.routePointForm);
      this.setRoutePointEnvironment(this.routePointForm);
    } else if (this.weatherInputForm) {
      this.setCommonEnvironment(this.weatherInputForm);
    }
  }

  /**
   * Sets the common environment variables.
   *
   * @param form the form component to update
   */
  private setCommonEnvironment(form: AbstractFormComponent<any>) {
    form.gridRowHeight = environment.data.input.grid.rowHeight;
    form.fieldAppearance = environment.data.input.field.appearance;
    form.fieldColor = environment.data.input.field.color;
    form.fieldFloatLabel = environment.data.input.field.floatLabel;
  }

  /**
   * Sets the environment variables for the information form.
   *
   * @param informationForm the information form
   */
  private setInformationEnvironment(informationForm: InformationFormComponent) {
    informationForm.minPassengerVolume = environment.data.input.passengerVolume.min;
    informationForm.maxPassengerVolume = environment.data.input.passengerVolume.max;
  }

  /**
   * Sets the environment variables for the route point form.
   *
   * @param routePointForm the route point form
   */
  private setRoutePointEnvironment(routePointForm: RoutePointFormComponent) {
    routePointForm.icon = environment.data.input.route.icon[this.formId];
    routePointForm.step = environment.data.input.route.step;
  }

}
