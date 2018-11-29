import { async, TestBed } from '@angular/core/testing';

import { OutputPanelComponent } from './output-panel.component';

describe('OutputPanelComponent', () => {
  let component: OutputPanelComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        OutputPanelComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    component = TestBed.get(OutputPanelComponent);
  });

  describe('Instantiation', () => {
    it('should instantiate the component', () => {
      expect(component).toBeTruthy();
    });
  });
});
