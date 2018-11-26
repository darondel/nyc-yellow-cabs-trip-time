import * as moment from 'moment';

import { DataActionType, UpdateInformation, UpdateRoute, UpdateWeather } from './data.actions';
import { TemperatureUnit } from '../models/weather.model';

describe('DataActions', () => {
  describe('UpdateInformation', () => {
    it('should create an UPDATE_INFORMATION action with a partial information change', () => {
      const information = {departureTime: moment()};
      const action = new UpdateInformation(information);

      expect(action.type).toEqual(DataActionType.UPDATE_INFORMATION);
      expect(action.changes).toEqual(information);
    });
  });

  describe('UpdateRoute', () => {
    it('should create an UPDATE_ROUTE action with a partial route change', () => {
      const route = {origin: {lat: -90, lng: 180}};
      const action = new UpdateRoute(route);

      expect(action.type).toEqual(DataActionType.UPDATE_ROUTE);
      expect(action.changes).toEqual(route);
    });
  });

  describe('UpdateWeather', () => {
    it('should create an UPDATE_WEATHER action with a partial weather change', () => {
      const weather = {temperature: {value: 10, unit: TemperatureUnit.CELSIUS}};
      const action = new UpdateWeather(weather);

      expect(action.type).toEqual(DataActionType.UPDATE_WEATHER);
      expect(action.changes).toEqual(weather);
    });
  });
});
