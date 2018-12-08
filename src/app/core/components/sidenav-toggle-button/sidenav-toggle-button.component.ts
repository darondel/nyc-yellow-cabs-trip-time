import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ThemePalette, TooltipPosition } from '@angular/material';

@Component({
  selector: 'app-sidenav-toggle-button',
  templateUrl: './sidenav-toggle-button.component.html',
  styleUrls: ['./sidenav-toggle-button.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidenavToggleButtonComponent {

  @Input() sidenavOpened: boolean;
  @Input() sidenavPosition: 'start' | 'end';
  @Input() color: ThemePalette;
  @Input() tooltipPosition: TooltipPosition;

  /**
   * Tooltip associated with the button.
   */
  get tooltip(): string {
    return (this.sidenavOpened ? 'Collapse' : 'Expand') + ' the side panel';
  }

  /**
   * Icon which is put inside the button.
   */
  get icon(): string {
    let result = 'arrow_';

    if (this.sidenavPosition === 'start') {
      result += this.sidenavOpened ? 'left' : 'right';
    } else {
      result += this.sidenavOpened ? 'right' : 'left';
    }

    return result;
  }

}
