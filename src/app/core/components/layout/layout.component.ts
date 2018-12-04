import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent {

  @Input() sidenavOpened: boolean;
  @Input() sidenavWidth: string;
  @Input() sidenavInnerToggleButton: boolean;

  @Output() sidenavOpenedChange = new EventEmitter<boolean>();

  @ViewChild('sidenav') sidenav: MatSidenav;

  /**
   * Toggle the sidenav.
   */
  onToggleSidenav() {
    this.sidenavOpenedChange.emit(!this.sidenav.opened);
  }

}
