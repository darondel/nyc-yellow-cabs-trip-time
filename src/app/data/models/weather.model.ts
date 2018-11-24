import { PrecipitationUnit } from './precipitation.model';
import { TemperatureUnit } from './temperature.model';
import { VisibilityUnit } from './visibility.model';

export interface Weather {
  temperature: WeatherInput<TemperatureUnit>;
  precipitation: WeatherInput<PrecipitationUnit>;
  visibility: WeatherInput<VisibilityUnit>;
}

export interface WeatherInput<T extends PrecipitationUnit | TemperatureUnit | VisibilityUnit> {
  value: number;
  unit: T;
}
