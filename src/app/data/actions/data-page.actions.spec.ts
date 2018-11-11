import { DataPageActionType, Submit } from './data-page.actions';

describe('DataPageActions', () => {
  describe('Submit', () => {
    it('should create a SUBMIT action with no parameter', () => {
      const action = new Submit();

      expect(action.type).toEqual(DataPageActionType.SUBMIT);
    });
  });
});
