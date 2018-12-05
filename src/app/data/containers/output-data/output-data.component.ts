import { Component, OnInit } from '@angular/core';

import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { AppState, getOutputDataError, getOutputDataResult, isOutputDataPending } from '../../../core/reducers/app.reducer';

@Component({
  selector: 'app-output-data',
  templateUrl: './output-data.component.html',
  styleUrls: ['./output-data.component.css']
})
export class OutputDataComponent implements OnInit {

  pending: Observable<boolean>;
  error: Observable<string>;
  result: Observable<number>;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.pending = this.store.pipe(select(isOutputDataPending));
    this.error = this.store.pipe(select(getOutputDataError));
    this.result = this.store.pipe(select(getOutputDataResult));
  }

}
