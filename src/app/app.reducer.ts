import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import {
  dataReducer,
  DataState,
  getDepartureTime,
  getDestination,
  getOrigin,
  getPassengerVolume,
  getWeather
} from './data/reducers/data.reducer';
import { getCenter, getZoom, mapReducer, MapState } from './map/reducers/map.reducer';

export interface AppState {
  data: DataState;
  map: MapState;
}

export const reducers: ActionReducerMap<AppState> = {
  data: dataReducer,
  map: mapReducer
};

export const getDataState = createFeatureSelector<AppState, DataState>('data');
export const getDataOrigin = createSelector(getDataState, getOrigin);
export const getDataDestination = createSelector(getDataState, getDestination);
export const getDataDepartureTime = createSelector(getDataState, getDepartureTime);
export const getDataWeather = createSelector(getDataState, getWeather);
export const getDataPassengerVolume = createSelector(getDataState, getPassengerVolume);

export const getMapState = createFeatureSelector<AppState, MapState>('map');
export const getMapCenter = createSelector(getMapState, getCenter);
export const getMapZoom = createSelector(getMapState, getZoom);
