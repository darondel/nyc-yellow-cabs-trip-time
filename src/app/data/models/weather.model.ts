import { Precipitation } from './precipitation.model';
import { Temperature } from './temperature.model';
import { Visibility } from './visibility.model';

export interface Weather {
  temperature: Temperature;
  precipitation: Precipitation;
  visibility: Visibility;
}
