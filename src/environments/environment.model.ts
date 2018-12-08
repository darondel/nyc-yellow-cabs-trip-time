import { EnvironmentData } from './data/environment.model';
import { EnvironmentMap } from './map/environment.model';
import { EnvironmentLayout } from './layout/environment.model';

export interface Environment {
  production: boolean;
  layout: EnvironmentLayout;
  data: EnvironmentData;
  map: EnvironmentMap;
}
