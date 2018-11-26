import { Component, OnInit } from '@angular/core';

import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { LatLngLiteral } from '@agm/core';

import * as moment from 'moment';
import { Moment } from 'moment';

import { UpdateInformation, UpdateRoute, UpdateWeather } from '../../actions/data.actions';
import { Information } from '../../models/information.model';
import { Route } from '../../models/route.model';
import { PrecipitationUnit, TemperatureUnit, VisibilityUnit, Weather, WeatherInput } from '../../models/weather.model';
import { AppState, getInputDataInformation, getInputDataRoute, getInputDataWeather } from '../../../app.reducer';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-input-data',
  templateUrl: './input-data.component.html',
  styleUrls: ['./input-data.component.css']
})
export class InputDataComponent implements OnInit {

  information: Observable<Information>;
  route: Observable<Route>;
  weather: Observable<Weather>;

  environment = environment;
  weatherUnits = {
    precipitation: PrecipitationUnit,
    temperature: TemperatureUnit,
    visibility: VisibilityUnit
  };

  private statuses = new Map<string, string>();

  constructor(private store: Store<AppState>) {
  }

  /**
   * Validity of the form.
   */
  get valid(): boolean {
    return Object.values(this.statuses).every(status => this.isFormValid(status));
  }

  /**
   * Minimum departure time allowed.
   */
  get minDepartureTime(): Moment {
    return moment();
  }

  ngOnInit() {
    this.information = this.store.pipe(select(getInputDataInformation));
    this.route = this.store.pipe(select(getInputDataRoute));
    this.weather = this.store.pipe(select(getInputDataWeather));
  }

  /**
   * Reacts to a change on an information and dispatches it to the state.
   *
   * @param information the new information
   */
  onInformationChange(information: Information) {
    this.store.dispatch(new UpdateInformation(information));
  }

  /**
   * Reacts to a change on a route point and dispatches it to the state.
   *
   * @param id the id associated with the route point
   * @param routePoint the new route point
   */
  onRoutePointChange(id: string, routePoint: LatLngLiteral) {
    this.store.dispatch(new UpdateRoute({[id]: routePoint}));
  }

  /**
   * Reacts to a change on a weather input and dispatches it to the state.
   *
   * @param id the id associated with the weather input
   * @param weatherInput the new weather input
   */
  onWeatherInputChange(id: string, weatherInput: WeatherInput<any>) {
    this.store.dispatch(new UpdateWeather({[id]: weatherInput}));
  }

  /**
   * Reacts to a change on a form status.
   *
   * @param id the id of the form
   * @param status the status of the form
   */
  onStatusChange(id: string, status: string) {
    this.statuses.set(id, status);
  }

  /**
   * Checks if a form is valid.
   *
   * @param status the status of the form
   * @return true if the form is valid, false otherwise
   */
  private isFormValid(status: string): boolean {
    return status === 'VALID';
  }

}
