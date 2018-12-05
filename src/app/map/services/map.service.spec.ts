import { async, TestBed } from '@angular/core/testing';

import { LatLngLiteral } from '@agm/core';

import { MapService } from './map.service';

describe('MapService', () => {
  let service: MapService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        MapService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    service = TestBed.get(MapService);
  });

  describe('Instantiation', () => {
    it('should instantiate the service', () => {
      expect(service).toBeTruthy();
    });
  });

  describe('Operations', () => {
    describe('equals', () => {
      it('should return true if two geographical coordinates are equals', () => {
        const coord1: LatLngLiteral = {lat: 15.123456789, lng: 20.987654321};
        const coord2: LatLngLiteral = {lat: 15.123457, lng: 20.987654};

        expect(service.equals(coord1, coord2)).toBeTruthy();
      });

      it('should return false if two geographical coordinates are different', () => {
        const coord1: LatLngLiteral = {lat: 15.123456789, lng: 20.987654321};
        const coord2: LatLngLiteral = {lat: 15.123450002, lng: 20.987654};

        expect(service.equals(coord1, coord2)).toBeFalsy();
      });
    });
  });
});
