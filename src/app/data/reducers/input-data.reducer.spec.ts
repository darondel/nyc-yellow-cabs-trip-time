import { getInformation, getRoute, getWeather, inputDataReducer, InputDataState } from './input-data.reducer';
import { UpdateInformation, UpdateRoute, UpdateWeather } from '../actions/data.actions';
import { PrecipitationUnit } from '../models/precipitation.model';
import { TemperatureUnit } from '../models/temperature.model';
import { VisibilityUnit } from '../models/visibility.model';

describe('InputDataReducer', () => {
  const initialState: InputDataState = {
    information: {
      departureTime: new Date(),
      passengerVolume: 1
    },
    route: {
      origin: {lat: -90, lng: -180},
      destination: {lat: 90, lng: 180}
    },
    weather: {
      temperature: {value: 10, unit: TemperatureUnit.CELSIUS},
      precipitation: {value: 1, unit: PrecipitationUnit.MILLIMETERS},
      visibility: {value: 10, unit: VisibilityUnit.KILOMETERS}
    }
  };

  describe('State Changes', () => {
    it('should have an initial state', () => {
      const state = inputDataReducer(initialState, {type: '@@init'} as any);

      expect(state).toBe(initialState);
    });

    it('should update the information', () => {
      const action = new UpdateInformation({passengerVolume: 5});
      const state = inputDataReducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        information: {
          ...initialState.information,
          ...action.changes
        }
      });
    });

    it('should update the route', () => {
      const action = new UpdateRoute({destination: {lat: -90, lng: 180}});
      const state = inputDataReducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        route: {
          ...initialState.route,
          ...action.changes
        }
      });
    });

    it('should update the weather', () => {
      const action = new UpdateWeather({visibility: {value: 5, unit: VisibilityUnit.MILES}});
      const state = inputDataReducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        weather: {
          ...initialState.weather,
          ...action.changes
        }
      });
    });
  });

  describe('Selectors', () => {
    describe('getInformation', () => {
      it('should get the information', () => {
        const information = getInformation(initialState);

        expect(information).toBe(initialState.information);
      });
    });

    describe('getRoute', () => {
      it('should get the route', () => {
        const route = getRoute(initialState);

        expect(route).toBe(initialState.route);
      });
    });

    describe('getWeather', () => {
      it('should get the weather', () => {
        const weather = getWeather(initialState);

        expect(weather).toBe(initialState.weather);
      });
    });
  });
});
