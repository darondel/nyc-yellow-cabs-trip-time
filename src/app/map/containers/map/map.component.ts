import { Component, OnInit } from '@angular/core';

import { LatLngLiteral } from '@agm/core';

import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { UpdateCenter, UpdateZoom } from '../../actions/map.actions';
import { AppState, getInputDataDestination, getInputDataOrigin, getMapCenter, getMapZoom } from '../../../core/reducers/app.reducer';
import { UpdateRoute } from '../../../data/actions/data.actions';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  center: Observable<LatLngLiteral>;
  origin: Observable<LatLngLiteral>;
  destination: Observable<LatLngLiteral>;
  zoom: Observable<number>;

  environment = environment;

  constructor(private store: Store<AppState>) {
  }

  /**
   * @inheritDoc
   */
  ngOnInit() {
    this.center = this.store.pipe(select(getMapCenter));
    this.origin = this.store.pipe(select(getInputDataOrigin));
    this.destination = this.store.pipe(select(getInputDataDestination));
    this.zoom = this.store.pipe(select(getMapZoom));
  }

  /**
   * Reacts to a change on the zoom level and dispatches it to the state.
   *
   * @param zoom the new zoom level
   */
  onZoomChange(zoom: number) {
    this.store.dispatch(new UpdateZoom(zoom));
  }

  /**
   * Reacts to a change on the center and dispatches it to the state.
   *
   * @param center the new center
   */
  onCenterChange(center: LatLngLiteral) {
    this.store.dispatch(new UpdateCenter(center));
  }

  /**
   * Reacts to a change on a marker and dispatches it to the state.
   *
   * @param id the id of the marker
   * @param coord the geographical coordinates of the marker
   */
  onMarkerChange(id: string, coord: LatLngLiteral) {
    this.store.dispatch(new UpdateRoute({[id]: coord}));
  }

}
