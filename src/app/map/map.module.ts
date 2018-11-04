import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';

import { MapComponent } from './map.component';
import { environment } from '../../environments/environment';

@NgModule({
  declarations: [
    MapComponent
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: environment.apiKeys.googleMaps
    }),
    AgmDirectionModule,
    CommonModule
  ],
  exports: [
    MapComponent
  ]
})
export class MapModule {
}
