import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataService {

  submit(): Observable<number> {
    return of(40).pipe(delay(10000));
  }

}
