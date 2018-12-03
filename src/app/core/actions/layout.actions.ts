import { Action } from '@ngrx/store';

export enum LayoutActionType {
  OPEN_SIDENAV = '[Layout] Open Sidenav',
  CLOSE_SIDENAV = '[Layout] Close Sidenav'
}

export class OpenSidenav implements Action {
  readonly type = LayoutActionType.OPEN_SIDENAV;
}

export class CloseSidenav implements Action {
  readonly type = LayoutActionType.CLOSE_SIDENAV;
}

export type LayoutAction = OpenSidenav | CloseSidenav;
