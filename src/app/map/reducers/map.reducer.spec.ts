import { getCenter, getZoom, mapReducer, MapState } from './map.reducer';
import { UpdateCenter, UpdateZoom } from '../actions/map.actions';

describe('MapReducer', () => {
  const initialState: MapState = {
    center: {lat: 40.756107, lng: -73.992067},
    zoom: 13
  };

  describe('State Changes', () => {
    it('should have an initial state', () => {
      const state = mapReducer(initialState, {type: '@@init'} as any);

      expect(state).toBe(initialState);
    });

    it('should update the center', () => {
      const action = new UpdateCenter({lat: -90});
      const state = mapReducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        center: {
          ...initialState.center,
          ...action.changes
        }
      });
    });

    it('should update the zoom level', () => {
      const action = new UpdateZoom(10);
      const state = mapReducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        zoom: action.zoom
      });
    });
  });

  describe('Selectors', () => {
    describe('getCenter', () => {
      it('should get the center', () => {
        const information = getCenter(initialState);

        expect(information).toBe(initialState.center);
      });
    });

    describe('getZoom', () => {
      it('should get the zom level', () => {
        const route = getZoom(initialState);

        expect(route).toBe(initialState.zoom);
      });
    });
  });
});
