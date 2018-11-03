import { MapAction, MapActionType } from '../actions/map.actions';
import { GeographicCoordinate, manhattanCenterPoint } from '../../../data/store/models/geographic-coordinate.model';

export interface MapState {
  centerPoint: GeographicCoordinate;
  zoomLevel: number;
}

export const initialState: MapState = {
  centerPoint: manhattanCenterPoint,
  zoomLevel: 13
};

export function mapReducer(state = initialState, action: MapAction): MapState {
  switch (action.type) {
    case MapActionType.PICK_CENTER_POINT:
      return {...state, centerPoint: action.coord};
    case MapActionType.PICK_ZOOM_LEVEL:
      return {...state, zoomLevel: action.zoomLevel};
    default:
      return state;
  }
}

export const getCenterPoint = (state: MapState) => state.centerPoint;
export const getZoomLevel = (state: MapState) => state.zoomLevel;
