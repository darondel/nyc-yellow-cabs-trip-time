import { Directive, Host } from '@angular/core';
import { MatGridList } from '@angular/material';

import { environment } from '../../../environments/environment';

@Directive({
  selector: 'mat-grid-list[appFormGrid]'
})
export class FormGridDirective {

  constructor(@Host() private gridList: MatGridList) {
    gridList.rowHeight = environment.data.input.grid.rowHeight;
  }

}
