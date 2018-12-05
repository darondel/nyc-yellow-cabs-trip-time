import { LatLngLiteral } from '@agm/core';

import { Action } from '@ngrx/store';

export enum MapActionType {
  UPDATE_CENTER = '[Map] Update Center',
  UPDATE_ZOOM = '[Map] Update Zoom'
}

export class UpdateCenter implements Action {
  readonly type = MapActionType.UPDATE_CENTER;

  constructor(public changes: Partial<LatLngLiteral>) {
  }
}

export class UpdateZoom implements Action {
  readonly type = MapActionType.UPDATE_ZOOM;

  constructor(public zoom: number) {
  }
}

export type MapAction = UpdateCenter | UpdateZoom;
