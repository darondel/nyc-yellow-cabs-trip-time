import { EnvironmentInputData } from './input/environment.model';
import { EnvironmentOutputData } from './output/environment.model';
import { EnvironmentSubmitData } from './submit/environment.model';

export interface EnvironmentData {
  input: EnvironmentInputData;
  output: EnvironmentOutputData;
  submit: EnvironmentSubmitData;
}
