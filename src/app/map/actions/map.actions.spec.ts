import { MapActionType, UpdateCenter, UpdateZoom } from './map.actions';

describe('MapActions', () => {
  describe('UpdateCenter', () => {
    it('should create an UPDATE_CENTER action with a partial center change', () => {
      const center = {lat: -90};
      const action = new UpdateCenter(center);

      expect(action.type).toEqual(MapActionType.UPDATE_CENTER);
      expect(action.changes).toEqual(center);
    });
  });

  describe('UpdateZoom', () => {
    it('should create an UPDATE_ZOOM action with a new zoom level', () => {
      const zoom = 10;
      const action = new UpdateZoom(zoom);

      expect(action.type).toEqual(MapActionType.UPDATE_ZOOM);
      expect(action.zoom).toEqual(zoom);
    });
  });
});
