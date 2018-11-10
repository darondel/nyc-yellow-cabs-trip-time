import { Action } from '@ngrx/store';

export enum DataAPIActionType {
  SUBMIT_SUCCESS = '[Data API] Submit Success',
  SUBMIT_FAILURE = '[Data API] Submit Failure'
}

export class SubmitSuccess implements Action {
  readonly type = DataAPIActionType.SUBMIT_SUCCESS;

  constructor(public result: number) {
  }
}

export class SubmitFailure implements Action {
  readonly type = DataAPIActionType.SUBMIT_FAILURE;

  constructor(public error: string) {
  }
}

export type DataAPIAction = SubmitSuccess | SubmitFailure;
