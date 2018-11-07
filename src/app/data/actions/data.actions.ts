import { LatLngLiteral } from '@agm/core';

import { Action } from '@ngrx/store';

import { Weather } from '../models/weather.model';

export enum DataActionType {
  UPDATE_ORIGIN = '[Data] Update Origin',
  UPDATE_DESTINATION = '[Data] Update Destination',
  UPDATE_DEPARTURE_TIME = '[Data] Update Departure Time',
  UPDATE_WEATHER = '[Data] Update Weather',
  UPDATE_PASSENGER_VOLUME = '[Data] Update Passenger Volume'
}

export class UpdateOrigin implements Action {
  readonly type = DataActionType.UPDATE_ORIGIN;

  constructor(public origin: LatLngLiteral) {
  }
}

export class UpdateDestination implements Action {
  readonly type = DataActionType.UPDATE_DESTINATION;

  constructor(public destination: LatLngLiteral) {
  }
}

export class UpdateDepartureTime implements Action {
  readonly type = DataActionType.UPDATE_DEPARTURE_TIME;

  constructor(public departureTime: Date) {
  }
}

export class UpdateWeather implements Action {
  readonly type = DataActionType.UPDATE_WEATHER;

  constructor(public weather: Weather) {
  }
}

export class UpdatePassengerVolume implements Action {
  readonly type = DataActionType.UPDATE_PASSENGER_VOLUME;

  constructor(public passengerVolume: number) {
  }
}

export type DataAction = UpdateOrigin | UpdateDestination | UpdateDepartureTime | UpdateWeather | UpdatePassengerVolume;
