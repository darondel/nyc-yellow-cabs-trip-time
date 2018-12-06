import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { LatLngLiteral, MouseEvent } from '@agm/core';

import { MapService } from '../../services/map.service';

@Component({
  selector: 'app-map-preview',
  templateUrl: './map-preview.component.html',
  styleUrls: ['./map-preview.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapPreviewComponent {

  @Input() center: LatLngLiteral;
  @Input() origin: LatLngLiteral;
  @Input() destination: LatLngLiteral;
  @Input() originIcon: string;
  @Input() destinationIcon: string;
  @Input() zoom: number;

  @Output() centerChange = new EventEmitter<LatLngLiteral>();
  @Output() originChange = new EventEmitter<LatLngLiteral>();
  @Output() destinationChange = new EventEmitter<LatLngLiteral>();
  @Output() zoomChange = new EventEmitter<number>();

  /**
   * Specific center to store an on-going position (drag).
   */
  private onGoingCenter: LatLngLiteral;

  /**
   * True if markers are draggable, false otherwise.
   */
  get markerDraggable(): boolean {
    return true;
  }

  constructor(private mapService: MapService) {
  }

  /**
   * Emits an event with the new zoom level, if different.
   *
   * @param zoom the new zoom level
   */
  onZoomChange(zoom: number) {
    if (this.zoom !== zoom) {
      this.zoomChange.emit(zoom);
    }
  }

  /**
   * Stores the on-going center to emit it later, when the map is idle.
   *
   * @param center the new center
   */
  onCenterChange(center: LatLngLiteral) {
    this.onGoingCenter = center;
  }

  /**
   * Emits an event with the new center, if different.
   */
  onIdle() {
    if (this.onGoingCenter && !this.mapService.equals(this.center, this.onGoingCenter)) {
      this.centerChange.emit(this.onGoingCenter);
    }
  }

  /**
   * Emits an event with the new geographical coordinates for a marker, if different.
   *
   * @param id the id of the marker, either 'origin' or 'destination'
   * @param event the event containing the new geographical coordinates of the marker
   */
  onMarkerDragEnd(id: 'origin' | 'destination', event: MouseEvent) {
    if (!this.mapService.equals(id === 'origin' ? this.origin : this.destination, event.coords)) {
      (id === 'origin' ? this.originChange : this.destinationChange).emit(event.coords);
    }
  }

}
