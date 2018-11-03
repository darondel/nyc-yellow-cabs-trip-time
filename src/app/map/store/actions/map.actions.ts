import { Action } from '@ngrx/store';

import { GeographicCoordinate } from '../../../data/store/models/geographic-coordinate.model';

export enum MapActionType {
  PICK_CENTER_POINT = '[Map] Pick Center Point',
  PICK_ZOOM_LEVEL = '[Map] Pick Zoom Level'
}

export class PickCenterPoint implements Action {
  readonly type = MapActionType.PICK_CENTER_POINT;

  constructor(public coord: GeographicCoordinate) {
  }
}

export class PickZoomLevel implements Action {
  readonly type = MapActionType.PICK_ZOOM_LEVEL;

  constructor(public zoomLevel: number) {
  }
}

export type MapAction = PickCenterPoint | PickZoomLevel;
