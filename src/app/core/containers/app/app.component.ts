import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';

import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CloseSidenav, OpenSidenav } from '../../actions/layout.actions';
import { AppState, isLayoutSidenavOpen } from '../../../app.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  isSmallScreen: Observable<boolean>;
  sidenavOpened: Observable<boolean>;
  sidenavWidth: Observable<string>;

  constructor(private store: Store<AppState>, private breakpointObserver: BreakpointObserver) {
  }

  /**
   * @inheritDoc
   */
  ngOnInit() {
    this.isSmallScreen = this.breakpointObserver.observe('(max-width: 749px)').pipe(map(state => state.matches));
    this.sidenavOpened = this.store.pipe(select(isLayoutSidenavOpen));
    this.sidenavWidth = this.isSmallScreen.pipe(map(matches => matches ? '100%' : '375px'));
  }

  /**
   * Reacts to an opened change on the sidenav and dispatches it to the state.
   *
   * @param opened true if the sidenav is open, false otherwise
   */
  onSidenavOpenedChange(opened: boolean) {
    this.store.dispatch(opened ? new OpenSidenav() : new CloseSidenav());
  }

}
