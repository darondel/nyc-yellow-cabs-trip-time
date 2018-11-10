import { Action } from '@ngrx/store';

export enum DataPageActionType {
  SUBMIT = '[Data Page] Submit'
}

export class Submit implements Action {
  readonly type = DataPageActionType.SUBMIT;
}

export type DataPageAction = Submit;
