import { Component, OnInit } from '@angular/core';

import { LatLngLiteral } from '@agm/core';

import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { filter, first } from 'rxjs/operators';

import { UpdateCenter, UpdateZoom } from './actions/map.actions';
import {
  AppState,
  getDataDepartureTime,
  getDataDestination,
  getDataOrigin,
  getMapCenter,
  getMapZoom
} from '../app.reducer';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  center: Observable<LatLngLiteral>;
  origin: Observable<LatLngLiteral>;
  destination: Observable<LatLngLiteral>;
  departureTime: Observable<Date>;
  zoom: Observable<number>;

  /**
   * Specific options for marking each direction on the map:
   * <ul>
   * <li>Updates direction icons for both origin and destination.</li>
   * <li>Makes each marker draggable.</li>
   * </ul>
   */
  directionMarkerOptions = {
    origin: {
      icon: 'assets/images/icons/map-dot-blue.png'
    },
    destination: {
      icon: 'assets/images/icons/map-dot-red.png'
    }
  };

  /**
   * Specific options for rendering each direction on the map:
   * <ul>
   * <li>Removes default markers.</li>
   * <li>Updates direction strokes, i.e the color, opacity and weight.</li>
   * </ul>

   * @link https://developers.google.com/maps/documentation/javascript/reference/directions#DirectionsRendererOptions
   */
  directionRendererOptions = {
    suppressMarkers: true,
    polylineOptions: {
      strokeColor: 'indigo',
      strokeOpacity: 0.6,
      strokeWeight: 4
    }
  };

  /**
   * Specific center to store an on-going position (drag).
   */
  private onGoingCenter: LatLngLiteral;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.center = this.store.pipe(select(getMapCenter));
    this.origin = this.store.pipe(select(getDataOrigin));
    this.destination = this.store.pipe(select(getDataDestination));
    this.departureTime = this.store.pipe(select(getDataDepartureTime));
    this.zoom = this.store.pipe(select(getMapZoom));
  }

  /**
   * Dispatches a change on the zoom level, if different.
   *
   * @param zoomLevel the new zoom level
   */
  onZoomChange(zoomLevel: number) {
    this.zoom.pipe(
      first(),
      filter(latestZoomLevel => latestZoomLevel !== zoomLevel)
    ).subscribe(() => this.store.dispatch(new UpdateZoom(zoomLevel)));
  }

  /**
   * Stores the on-going center to dispatch a change on it later, when the map is idle.
   *
   * @param center the new center point
   */
  onCenterChange(center: LatLngLiteral) {
    this.onGoingCenter = center;
  }

  /**
   * Dispatches a change on the center, if different.
   */
  onIdle() {
    if (this.onGoingCenter) {
      this.center.pipe(
        first(),
        filter(latestCenter => JSON.stringify(latestCenter) !== JSON.stringify(this.onGoingCenter))
      ).subscribe(() => this.store.dispatch(new UpdateCenter(this.onGoingCenter)));
    }
  }

}
