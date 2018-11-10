export interface Temperature {
  value: number;
  unit: TemperatureUnit;
}

export enum TemperatureUnit {
  CELSIUS = '°C',
  FAHRENHEIT = '°F'
}
