import { isSidenavOpen, layoutReducer, LayoutState } from './layout.reducer';
import { CloseSidenav, OpenSidenav } from '../actions/layout.actions';

describe('LayoutReducer', () => {
  const initialState: LayoutState = {
    sidenavOpen: true
  };

  describe('State Changes', () => {
    it('should have an initial state', () => {
      const state = layoutReducer(initialState, {type: '@@init'} as any);

      expect(state).toBe(initialState);
    });

    it('should open the side panel', () => {
      const action = new OpenSidenav();
      const state = layoutReducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        sidenavOpen: true
      });
    });

    it('should close the side panel', () => {
      const action = new CloseSidenav();
      const state = layoutReducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        sidenavOpen: false
      });
    });
  });

  describe('Selectors', () => {
    describe('isSidenavOpen', () => {
      it('should indicate if the side panel is open', () => {
        const information = isSidenavOpen(initialState);

        expect(information).toBe(initialState.sidenavOpen);
      });
    });
  });
});
