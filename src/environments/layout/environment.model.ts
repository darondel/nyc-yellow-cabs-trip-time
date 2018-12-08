import { EnvironmentSidenav } from './sidenav/environment.model';

export interface EnvironmentLayout {
  smallScreen: string | number;
  sidenav: EnvironmentSidenav;
}
