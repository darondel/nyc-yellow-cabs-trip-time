import { DataAPIAction, DataAPIActionType } from '../actions/data-api.actions';
import { DataPageAction, DataPageActionType } from '../actions/data-page.actions';

export interface OutputDataState {
  pending: boolean;
  error: string | null;
  result: number | null;
}

export const initialState: OutputDataState = {
  pending: false,
  error: null,
  result: null
};

export function outputDataReducer(state = initialState, action: DataPageAction | DataAPIAction): OutputDataState {
  switch (action.type) {
    case DataPageActionType.SUBMIT:
      return {
        ...state,
        pending: true,
        error: null,
        result: null
      };
    case DataAPIActionType.SUBMIT_SUCCESS:
      return {
        ...state,
        pending: false,
        error: null,
        result: action.result
      };
    case DataAPIActionType.SUBMIT_FAILURE:
      return {
        ...state,
        pending: false,
        error: action.error,
        result: null
      };
    default:
      return state;
  }
}

export const isPending = (state: OutputDataState) => state.pending;
export const getError = (state: OutputDataState) => state.error;
export const getResult = (state: OutputDataState) => state.result;
