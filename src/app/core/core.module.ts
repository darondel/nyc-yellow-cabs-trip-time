import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule, MatSidenavModule, MatTooltipModule } from '@angular/material';

import { LayoutComponent } from './components/layout/layout.component';
import { SidenavToggleButtonComponent } from './components/sidenav-toggle-button/sidenav-toggle-button.component';

@NgModule({
  declarations: [
    LayoutComponent,
    SidenavToggleButtonComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatTooltipModule
  ]
})
export class CoreModule {
}
