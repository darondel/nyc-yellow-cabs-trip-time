import { TestBed } from '@angular/core/testing';

import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';

import { Observable } from 'rxjs';

import { cold, hot } from 'jasmine-marbles';

import { DataEffects } from './data.effects';
import { SubmitFailure, SubmitSuccess } from '../actions/data-api.actions';
import { Submit } from '../actions/data-page.actions';
import { DataService } from '../services/data.service';

describe('DataEffects', () => {
  let effects: DataEffects;
  let dataService: DataService;
  let actions: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DataEffects,
        DataService,
        provideMockActions(() => actions)
      ]
    });

    effects = TestBed.get(DataEffects);
    dataService = TestBed.get(DataService);
    actions = TestBed.get(Actions);
  });

  describe('submit', () => {
    it('should submit to API and return the result, on success', () => {
      const result = 10;
      const action = new Submit();
      const completion = new SubmitSuccess(result);

      actions = hot('-a-', {a: action});
      const response = cold('-b|', {b: result});
      const expected = cold('--c', {c: completion});
      spyOn(dataService, 'submit').and.returnValue(response);

      expect(effects.submit).toBeObservable(expected);
    });

    it('should submit to API and return the error, on failure', () => {
      const error = 'An error has been raised';
      const action = new Submit();
      const completion = new SubmitFailure(error);

      actions = hot('-a-', {a: action});
      const response = cold('-#|', {}, error);
      const expected = cold('--b', {b: completion});
      spyOn(dataService, 'submit').and.returnValue(response);

      expect(effects.submit).toBeObservable(expected);
    });
  });
});
