import { Component, OnInit } from '@angular/core';

import { LatLngLiteral } from '@agm/core';

import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { filter, first } from 'rxjs/operators';

import { PickCenterPoint, PickZoomLevel } from './store/actions/map.actions';
import { AppState, getDataDate, getDataEndPoint, getDataStartPoint, getMapCenterPoint, getMapZoomLevel } from '../app.reducer';
import { GeographicCoordinate } from '../data/store/models/geographic-coordinate.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  centerPoint: Observable<GeographicCoordinate>;
  startPoint: Observable<GeographicCoordinate>;
  endPoint: Observable<GeographicCoordinate>;
  date: Observable<Date>;
  zoomLevel: Observable<number>;

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
   * Specific center point to store an on-going position (drag).
   */
  private onGoingCenterPoint: GeographicCoordinate;

  constructor(private state: Store<AppState>) {
  }

  ngOnInit() {
    this.centerPoint = this.state.pipe(select(getMapCenterPoint));
    this.startPoint = this.state.pipe(select(getDataStartPoint));
    this.endPoint = this.state.pipe(select(getDataEndPoint));
    this.date = this.state.pipe(select(getDataDate));
    this.zoomLevel = this.state.pipe(select(getMapZoomLevel));
  }

  /**
   * Dispatches a change on the zoom level, if different.
   *
   * @param zoomLevel the new zoom level
   */
  onZoomChange(zoomLevel: number) {
    this.zoomLevel.pipe(
      first(),
      filter(latestZoomLevel => latestZoomLevel !== zoomLevel)
    ).subscribe(() => this.state.dispatch(new PickZoomLevel(zoomLevel)));
  }

  /**
   * Stores the on-going center point to dispatch a change on it later, when the map is idle.
   *
   * @param centerPoint the new center point
   */
  onCenterChange(centerPoint: LatLngLiteral) {
    this.onGoingCenterPoint = {latitude: centerPoint.lat, longitude: centerPoint.lng};
  }

  /**
   * Dispatches a change on the center point, if different.
   */
  onIdle() {
    if (this.onGoingCenterPoint) {
      this.centerPoint.pipe(
        first(),
        filter(latestCenterPoint => JSON.stringify(latestCenterPoint) !== JSON.stringify(this.onGoingCenterPoint))
      ).subscribe(() => this.state.dispatch(new PickCenterPoint(this.onGoingCenterPoint)));
    }
  }

}
