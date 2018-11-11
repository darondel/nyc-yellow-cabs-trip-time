import { DataAPIActionType, SubmitFailure, SubmitSuccess } from './data-api.actions';

describe('DataAPIActions', () => {
  describe('SubmitSuccess', () => {
    it('should create a SUBMIT_SUCCESS action with a result number', () => {
      const result = 10;
      const action = new SubmitSuccess(result);

      expect(action.type).toEqual(DataAPIActionType.SUBMIT_SUCCESS);
      expect(action.result).toEqual(result);
    });
  });

  describe('SubmitFailure', () => {
    it('should create a SUBMIT_FAILURE action with an error', () => {
      const error = 'An error has been raised';
      const action = new SubmitFailure(error);

      expect(action.type).toEqual(DataAPIActionType.SUBMIT_FAILURE);
      expect(action.error).toEqual(error);
    });
  });
});
