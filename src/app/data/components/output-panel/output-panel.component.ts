import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-output-panel',
  templateUrl: './output-panel.component.html',
  styleUrls: ['./output-panel.component.css']
})
export class OutputPanelComponent {

  @Input() pending: boolean;
  @Input() error: string;
  @Input() result: number;
  @Input() spinnerDiameter: number;

}
