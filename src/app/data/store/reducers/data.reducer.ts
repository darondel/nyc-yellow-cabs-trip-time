import { DataAction, DataActionType } from '../actions/data.actions';
import { empireStateBuilding, GeographicCoordinate, oneWorldTradeCenter } from '../models/geographic-coordinate.model';
import { Weather } from '../models/weather.model';

export interface DataState {
  startPoint: GeographicCoordinate;
  endPoint: GeographicCoordinate;
  date: Date;
  weather: Weather;
  passengerVolume: number;
}

export const initialState: DataState = {
  startPoint: empireStateBuilding,
  endPoint: oneWorldTradeCenter,
  date: new Date(),
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

export function dataReducer(state = initialState, action: DataAction): DataState {
  switch (action.type) {
    case DataActionType.PICK_START_POINT:
      return {...state, startPoint: action.coord};
    case DataActionType.PICK_END_POINT:
      return {...state, endPoint: action.coord};
    case DataActionType.PICK_DATE:
      return {...state, date: action.date};
    case DataActionType.PICK_WEATHER:
      return {...state, weather: action.weather};
    case DataActionType.PICK_PASSENGER_VOLUME:
      return {...state, passengerVolume: action.volume};
    default:
      return state;
  }
}

export const getStartPoint = (state: DataState) => state.startPoint;
export const getEndPoint = (state: DataState) => state.endPoint;
export const getDate = (state: DataState) => state.date;
export const getWeather = (state: DataState) => state.weather;
export const getPassengerVolume = (state: DataState) => state.passengerVolume;
