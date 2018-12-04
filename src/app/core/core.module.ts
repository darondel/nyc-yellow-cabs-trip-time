import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatDividerModule,
  MatIconModule,
  MatSidenavModule,
  MatTooltipModule
} from '@angular/material';

import { DataModule } from '../data/data.module';
import { MapModule } from '../map/map.module';

import { LayoutComponent } from './components/layout/layout.component';
import { SidenavToggleButtonComponent } from './components/sidenav-toggle-button/sidenav-toggle-button.component';
import { AppComponent } from './containers/app/app.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    SidenavToggleButtonComponent
  ],
  imports: [
    CommonModule,
    DataModule,
    LayoutModule,
    MapModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatSidenavModule,
    MatTooltipModule
  ],
  exports: [
    AppComponent
  ]
})
export class CoreModule {
}
