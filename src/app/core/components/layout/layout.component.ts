import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent {

  @Input() sidenavOpened: boolean;
  @Input() sidenavWidth: string;

  @Output() sidenavOpenedChange = new EventEmitter<boolean>();

}
