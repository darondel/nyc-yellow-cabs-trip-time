import { Action } from '@ngrx/store';

import { Weather } from '../models/weather.model';
import { GeographicCoordinate } from '../models/geographic-coordinate.model';

export enum DataActionType {
  PICK_START_POINT = '[Data] Pick Start Point',
  PICK_END_POINT = '[Data] Pick End Point',
  PICK_DATE = '[Data] Pick Date',
  PICK_WEATHER = '[Data] Pick Weather',
  PICK_PASSENGER_VOLUME = '[Data] Pick Passenger Volume'
}

export class PickStartPoint implements Action {
  readonly type = DataActionType.PICK_START_POINT;

  constructor(public coord: GeographicCoordinate) {
  }
}

export class PickEndPoint implements Action {
  readonly type = DataActionType.PICK_END_POINT;

  constructor(public coord: GeographicCoordinate) {
  }
}

export class PickDate implements Action {
  readonly type = DataActionType.PICK_DATE;

  constructor(public date: Date) {
  }
}

export class PickWeather implements Action {
  readonly type = DataActionType.PICK_WEATHER;

  constructor(public weather: Weather) {
  }
}

export class PickPassengerVolume implements Action {
  readonly type = DataActionType.PICK_PASSENGER_VOLUME;

  constructor(public volume: number) {
  }
}

export type DataAction = PickStartPoint | PickEndPoint | PickDate | PickWeather | PickPassengerVolume;
