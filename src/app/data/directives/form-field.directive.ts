import { Directive, Host, HostBinding } from '@angular/core';
import { MatFormField } from '@angular/material';

import { environment } from '../../../environments/environment';

@Directive({
  selector: 'mat-form-field[appFormField]'
})
export class FormFieldDirective {

  @HostBinding('style.width.%') width = 100;

  constructor(@Host() private formField: MatFormField) {
    formField.appearance = environment.data.input.field.appearance;
    formField.color = environment.data.input.field.color;
    formField.floatLabel = environment.data.input.field.floatLabel;
  }

}
