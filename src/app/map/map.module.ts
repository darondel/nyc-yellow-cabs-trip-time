import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AgmCoreModule } from '@agm/core';

import { MapPreviewComponent } from './components/map-preview/map-preview.component';
import { MapComponent } from './containers/map/map.component';
import { environment } from '../../environments/environment';

@NgModule({
  declarations: [
    MapComponent,
    MapPreviewComponent
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: environment.map.apiKey
    }),
    CommonModule
  ],
  exports: [
    MapComponent
  ]
})
export class MapModule {
}
