import { ThemePalette } from '@angular/material';

export interface EnvironmentSidenav {
  width: string | number;
  toggle: EnvironmentSidenavToggle;
}

export interface EnvironmentSidenavToggle {
  color: ThemePalette
}
