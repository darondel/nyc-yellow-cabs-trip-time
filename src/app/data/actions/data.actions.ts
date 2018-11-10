import { Action } from '@ngrx/store';

import { Information } from '../models/information.model';
import { Route } from '../models/route.model';
import { Weather } from '../models/weather.model';

export enum DataActionType {
  UPDATE_INFORMATION = '[Data] Update Information',
  UPDATE_ROUTE = '[Data] Update Route',
  UPDATE_WEATHER = '[Data] Update Weather'
}

export class UpdateInformation implements Action {
  readonly type = DataActionType.UPDATE_INFORMATION;

  constructor(public changes: Partial<Information>) {
  }
}

export class UpdateRoute implements Action {
  readonly type = DataActionType.UPDATE_ROUTE;

  constructor(public changes: Partial<Route>) {
  }
}

export class UpdateWeather implements Action {
  readonly type = DataActionType.UPDATE_WEATHER;

  constructor(public changes: Partial<Weather>) {
  }
}

export type DataAction = UpdateInformation | UpdateRoute | UpdateWeather;
