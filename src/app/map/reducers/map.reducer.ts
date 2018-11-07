import { LatLngLiteral } from '@agm/core';

import { MapAction, MapActionType } from '../actions/map.actions';

export interface MapState {
  center: LatLngLiteral;
  zoom: number;
}

export const initialState: MapState = {
  center: {lat: 40.756107, lng: -73.992067},
  zoom: 13
};

export function mapReducer(state = initialState, action: MapAction): MapState {
  switch (action.type) {
    case MapActionType.UPDATE_CENTER:
      return {...state, center: action.center};
    case MapActionType.UPDATE_ZOOM:
      return {...state, zoom: action.zoom};
    default:
      return state;
  }
}

export const getCenter = (state: MapState) => state.center;
export const getZoom = (state: MapState) => state.zoom;
