import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { reducers } from './app.reducer';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({
      logOnly: environment.production
    })
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
