import { LatLngLiteral } from '@agm/core';

import { DataAction, DataActionType } from '../actions/data.actions';
import { Weather } from '../models/weather.model';

export interface InputDataState {
  origin: LatLngLiteral;
  destination: LatLngLiteral;
  departureTime: Date;
  weather: Weather;
  passengerVolume: number;
}

export const initialState: InputDataState = {
  origin: {lat: 40.748817, lng: -73.985428},
  destination: {lat: 40.712742, lng: -74.013382},
  departureTime: new Date(),
  weather: {
    temperature: 14,
    temperatureUnit: '°C',
    precipitation: 1.52,
    precipitationUnit: 'mm',
    visibility: 11,
    visibilityUnit: 'km'
  },
  passengerVolume: 1
};

export function inputDataReducer(state = initialState, action: DataAction): InputDataState {
  switch (action.type) {
    case DataActionType.UPDATE_ORIGIN:
      return {...state, origin: action.origin};
    case DataActionType.UPDATE_DESTINATION:
      return {...state, destination: action.destination};
    case DataActionType.UPDATE_DEPARTURE_TIME:
      return {...state, departureTime: action.departureTime};
    case DataActionType.UPDATE_WEATHER:
      return {...state, weather: action.weather};
    case DataActionType.UPDATE_PASSENGER_VOLUME:
      return {...state, passengerVolume: action.passengerVolume};
    default:
      return state;
  }
}

export const getOrigin = (state: InputDataState) => state.origin;
export const getDestination = (state: InputDataState) => state.destination;
export const getDepartureTime = (state: InputDataState) => state.departureTime;
export const getWeather = (state: InputDataState) => state.weather;
export const getPassengerVolume = (state: InputDataState) => state.passengerVolume;
