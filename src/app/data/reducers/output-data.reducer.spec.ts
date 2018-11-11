import { getError, getResult, isPending, outputDataReducer, OutputDataState } from './output-data.reducer';
import { SubmitFailure, SubmitSuccess } from '../actions/data-api.actions';
import { Submit } from '../actions/data-page.actions';

describe('OutputDataReducer', () => {
  const initialState: OutputDataState = {
    pending: false,
    error: null,
    result:  null
  };

  describe('State Changes', () => {
    it('should have an initial state', () => {
      const state = outputDataReducer(initialState, {type: '@@init'} as any);

      expect(state).toBe(initialState);
    });

    it('should be pending on API submission', () => {
      const action = new Submit();
      const state = outputDataReducer(initialState, action);

      expect(state).toEqual({
        pending: true,
        error: null,
        result: null
      });
    });

    it('should update the result on API success', () => {
      const action = new SubmitSuccess(10);
      const state = outputDataReducer(initialState, action);

      expect(state).toEqual({
        pending: false,
        error: null,
        result: action.result
      });
    });

    it('should update the error on API failure', () => {
      const action = new SubmitFailure('An error has been raised');
      const state = outputDataReducer(initialState, action);

      expect(state).toEqual({
        pending: false,
        error: action.error,
        result: null
      });
    });
  });

  describe('Selectors', () => {
    describe('isPending', () => {
      it('should get the pending status', () => {
        const pending = isPending(initialState);

        expect(pending).toBe(initialState.pending);
      });
    });

    describe('getError', () => {
      it('should get the error', () => {
        const error = getError(initialState);

        expect(error).toBe(initialState.error);
      });
    });

    describe('getResult', () => {
      it('should get the result', () => {
        const result = getResult(initialState);

        expect(result).toBe(initialState.result);
      });
    });
  });
});
