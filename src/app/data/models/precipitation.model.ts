export interface Precipitation {
  value: number;
  unit: PrecipitationUnit;
}

export enum PrecipitationUnit {
  INCHES = 'in',
  MILLIMETERS = 'mm'
}
