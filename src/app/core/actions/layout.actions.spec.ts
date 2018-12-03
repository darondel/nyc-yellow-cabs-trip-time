import { LayoutActionType, OpenSidenav, CloseSidenav } from './layout.actions';

describe('LayoutActions', () => {
  describe('OpenSidenav', () => {
    it('should create an OPEN_SIDENAV action', () => {
      const action = new OpenSidenav();

      expect(action.type).toEqual(LayoutActionType.OPEN_SIDENAV);
    });
  });

  describe('CloseSidenav', () => {
    it('should create a CLOSE_SIDENAV action', () => {
      const action = new CloseSidenav();

      expect(action.type).toEqual(LayoutActionType.CLOSE_SIDENAV);
    });
  });
});
