import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { SubmitFailure, SubmitSuccess } from '../actions/data-api.actions';
import { DataPageActionType, Submit } from '../actions/data-page.actions';
import { DataService } from '../services/data.service';

@Injectable()
export class DataEffects {

  @Effect()
  submit = this.actions.pipe(
    ofType<Submit>(DataPageActionType.SUBMIT),
    switchMap(() => this.dataService.submit().pipe(
      map(result => new SubmitSuccess(result)),
      catchError(error => of(new SubmitFailure(error)))
    ))
  );

  constructor(private actions: Actions, private dataService: DataService) {
  }

}
