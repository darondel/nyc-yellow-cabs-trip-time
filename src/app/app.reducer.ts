import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import {
  getDepartureTime,
  getDestination,
  getOrigin,
  getPassengerVolume,
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

export const getInputDataState = createFeatureSelector<AppState, InputDataState>('inputData');
export const getInputDataOrigin = createSelector(getInputDataState, getOrigin);
export const getInputDataDestination = createSelector(getInputDataState, getDestination);
export const getInputDataDepartureTime = createSelector(getInputDataState, getDepartureTime);
export const getInputDataWeather = createSelector(getInputDataState, getWeather);
export const getInputDataPassengerVolume = createSelector(getInputDataState, getPassengerVolume);

export const getOutputDataState = createFeatureSelector<AppState, OutputDataState>('outputData');
export const isOutputDataPending = createSelector(getOutputDataState, isPending);
export const getOutputDataError = createSelector(getOutputDataState, getError);
export const getOutputDataResult = createSelector(getOutputDataState, getResult);

export const getMapState = createFeatureSelector<AppState, MapState>('map');
export const getMapCenter = createSelector(getMapState, getCenter);
export const getMapZoom = createSelector(getMapState, getZoom);
