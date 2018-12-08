import { FloatLabelType, MatFormFieldAppearance, ThemePalette } from '@angular/material';

export interface EnvironmentInputData {
  grid: EnvironmentInputDataGrid;
  field: EnvironmentInputDataField;
  passengerVolume: EnvironmentInputDataPassengerVolume;
  route: EnvironmentInputDataRoute;
}

export interface EnvironmentInputDataGrid {
  rowHeight: string | number;
}

export interface EnvironmentInputDataField {
  appearance: MatFormFieldAppearance;
  color: ThemePalette;
  floatLabel: FloatLabelType;
}

export interface EnvironmentInputDataPassengerVolume {
  min: number;
  max: number;
}

export interface EnvironmentInputDataRoute {
  step: number;
  icon: EnvironmentInputDataRouteIcon
}

export interface EnvironmentInputDataRouteIcon {
  origin: string;
  destination: string;
}
