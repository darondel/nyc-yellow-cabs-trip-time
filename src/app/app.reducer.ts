import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import {
  getInformation,
  getRoute,
  getWeather,
  inputDataReducer,
  InputDataState
} from './data/reducers/input-data.reducer';
import {
  getError,
  getResult,
  isPending,
  outputDataReducer,
  OutputDataState
} from './data/reducers/output-data.reducer';
import { getCenter, getZoom, mapReducer, MapState } from './map/reducers/map.reducer';

export interface AppState {
  inputData: InputDataState;
  outputData: OutputDataState;
  map: MapState;
}

export const reducers: ActionReducerMap<AppState> = {
  inputData: inputDataReducer,
  outputData: outputDataReducer,
  map: mapReducer
};

// Input Data
export const getInputDataState = createFeatureSelector<AppState, InputDataState>('inputData');

export const getInputDataInformation = createSelector(getInputDataState, getInformation);
export const getInputDataDepartureTime = createSelector(getInputDataInformation, information => information.departureTime);
export const getInputDataPassengerVolume = createSelector(getInputDataInformation, information => information.passengerVolume);

export const getInputDataRoute = createSelector(getInputDataState, getRoute);
export const getInputDataOrigin = createSelector(getInputDataRoute, route => route.origin);
export const getInputDataDestination = createSelector(getInputDataRoute, route => route.destination);

export const getInputDataWeather = createSelector(getInputDataState, getWeather);
export const getInputDataTemperature = createSelector(getInputDataWeather, weather => weather.temperature);
export const getInputDataPrecipitation = createSelector(getInputDataWeather, weather => weather.precipitation);
export const getInputDataVisibility = createSelector(getInputDataWeather, weather => weather.visibility);

// Output Data
export const getOutputDataState = createFeatureSelector<AppState, OutputDataState>('outputData');

export const isOutputDataPending = createSelector(getOutputDataState, isPending);
export const getOutputDataError = createSelector(getOutputDataState, getError);
export const getOutputDataResult = createSelector(getOutputDataState, getResult);

// Map Data
export const getMapState = createFeatureSelector<AppState, MapState>('map');

export const getMapCenter = createSelector(getMapState, getCenter);
export const getMapZoom = createSelector(getMapState, getZoom);
