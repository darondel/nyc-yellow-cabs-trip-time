export interface Weather {
  temperature: WeatherInput<TemperatureUnit>;
  precipitation: WeatherInput<PrecipitationUnit>;
  visibility: WeatherInput<VisibilityUnit>;
}

export interface WeatherInput<T extends WeatherInputUnit> {
  value: number;
  unit: T;
}

export type WeatherInputUnit = PrecipitationUnit | TemperatureUnit | VisibilityUnit;

export enum PrecipitationUnit {
  INCHES = 'in',
  MILLIMETERS = 'mm'
}

export enum TemperatureUnit {
  CELSIUS = '°C',
  FAHRENHEIT = '°F'
}

export enum VisibilityUnit {
  MILES = 'mi',
  KILOMETERS = 'km'
}
