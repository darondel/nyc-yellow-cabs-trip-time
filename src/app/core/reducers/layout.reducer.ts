import { LayoutAction, LayoutActionType } from '../actions/layout.actions';

export interface LayoutState {
  sidenavOpen: boolean
}

export const initialState: LayoutState = {
  sidenavOpen: true
};

export function layoutReducer(state = initialState, action: LayoutAction): LayoutState {
  switch (action.type) {
    case LayoutActionType.OPEN_SIDENAV:
      return {...state, sidenavOpen: true};
    case LayoutActionType.CLOSE_SIDENAV:
      return {...state, sidenavOpen: false};
    default:
      return state;
  }
}

export const isSidenavOpen = (state: LayoutState) => state.sidenavOpen;
