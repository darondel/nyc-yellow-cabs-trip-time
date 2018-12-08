import { environment as devEnvironment } from './environment';
import { Environment } from './environment.model';

export const environment: Environment = {
  ...devEnvironment,
  production: true
};
