import * as moment from 'moment';

import { DataAction, DataActionType } from '../actions/data.actions';
import { Information } from '../models/information.model';
import { PrecipitationUnit } from '../models/precipitation.model';
import { Route } from '../models/route.model';
import { TemperatureUnit } from '../models/temperature.model';
import { VisibilityUnit } from '../models/visibility.model';
import { Weather } from '../models/weather.model';

export interface InputDataState {
  information: Information;
  route: Route;
  weather: Weather;
}

export const initialState: InputDataState = {
  information: {
    departureTime: moment().add(2, 'hours'),
    passengerVolume: 1
  },
  route: {
    origin: {lat: 40.748817, lng: -73.985428},
    destination: {lat: 40.712742, lng: -74.013382}
  },
  weather: {
    temperature: {value: 14, unit: TemperatureUnit.CELSIUS},
    precipitation: {value: 1.52, unit: PrecipitationUnit.MILLIMETERS},
    visibility: {value: 11, unit: VisibilityUnit.KILOMETERS}
  }
};

export function inputDataReducer(state = initialState, action: DataAction): InputDataState {
  switch (action.type) {
    case DataActionType.UPDATE_INFORMATION:
      const information = {...state.information, ...action.changes};
      return {...state, information};
    case DataActionType.UPDATE_ROUTE:
      const route = {...state.route, ...action.changes};
      return {...state, route};
    case DataActionType.UPDATE_WEATHER:
      const weather = {...state.weather, ...action.changes};
      return {...state, weather};
    default:
      return state;
  }
}

export const getInformation = (state: InputDataState) => state.information;
export const getRoute = (state: InputDataState) => state.route;
export const getWeather = (state: InputDataState) => state.weather;
