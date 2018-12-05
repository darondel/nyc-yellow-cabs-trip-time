import { Injectable } from '@angular/core';
import { LatLngLiteral } from '@agm/core';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private static readonly COORD_PRECISION = 6;

  /**
   * Checks if two georgraphical coordinates are equals.
   * This method only compares the six first decimal digits, i.e a precision of 0.11m.
   *
   * @param coord1 the first coordinate
   * @param coord2 the second coordinate
   * @return true if the two coordinates are equals, false otherwise
   */
  equals(coord1: LatLngLiteral, coord2: LatLngLiteral): boolean {
    let result = false;

    if (coord1 && coord2) {
      result = coord1.lat.toFixed(MapService.COORD_PRECISION) === coord2.lat.toFixed(MapService.COORD_PRECISION)
        && coord1.lng.toFixed(MapService.COORD_PRECISION) === coord2.lng.toFixed(MapService.COORD_PRECISION);
    }

    return result;
  }

}
