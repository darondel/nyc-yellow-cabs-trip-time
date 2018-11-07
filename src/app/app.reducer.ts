import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import {
  dataReducer,
  DataState,
  getDate,
  getEndPoint,
  getPassengerVolume,
  getStartPoint,
  getWeather
} from './data/store/reducers/data.reducer';
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
export const getDataStartPoint = createSelector(getDataState, getStartPoint);
export const getDataEndPoint = createSelector(getDataState, getEndPoint);
export const getDataDate = createSelector(getDataState, getDate);
export const getDataWeather = createSelector(getDataState, getWeather);
export const getDataPassengerVolume = createSelector(getDataState, getPassengerVolume);

export const getMapState = createFeatureSelector<AppState, MapState>('map');
export const getMapCenter = createSelector(getMapState, getCenter);
export const getMapZoom = createSelector(getMapState, getZoom);
