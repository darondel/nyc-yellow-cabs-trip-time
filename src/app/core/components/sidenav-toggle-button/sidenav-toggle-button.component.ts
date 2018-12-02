import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatSidenav, ThemePalette, TooltipPosition } from '@angular/material';

@Component({
  selector: 'app-sidenav-toggle-button',
  templateUrl: './sidenav-toggle-button.component.html',
  styleUrls: ['./sidenav-toggle-button.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidenavToggleButtonComponent {

  @Input() sidenav: MatSidenav;
  @Input() color: ThemePalette = 'primary';
  @Input() tooltipPosition: TooltipPosition = 'right';

  /**
   * Tooltip associated with the button.
   */
  get tooltip(): string {
    return (this.sidenav.opened ? 'Collapse' : 'Expand') + ' the side panel';
  }

  /**
   * Icon which is put inside the button.
   */
  get icon(): string {
    return 'arrow_' + (this.sidenav.opened ? 'left' : 'right');
  }

}
