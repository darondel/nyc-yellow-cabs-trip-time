import { async, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { WeatherInputFormComponent } from './weather-input-form.component';
import { TemperatureUnit } from '../../models/weather.model';

describe('WeatherInputFormComponent', () => {
  let component: WeatherInputFormComponent<TemperatureUnit>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      providers: [
        WeatherInputFormComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    component = TestBed.get(WeatherInputFormComponent);
  });

  describe('Instantiation', () => {
    it('should instantiate the component', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('Events', () => {
    describe('valueChange', () => {
      beforeEach(() => {
        spyOn(component.valueChange, 'emit').and.callThrough();
      });

      it('should emit an event if a value of the form is updated programmatically', fakeAsync(() => {
        component.form.markAsPristine();
        component.form.setValue({
          value: 0,
          unit: TemperatureUnit.CELSIUS
        });

        tick(500);
        expect(component.valueChange.emit).not.toHaveBeenCalled();
      }));

      it('should emit an event if a value of the form is updated by the user', fakeAsync(() => {
        const change = {
          value: 0,
          unit: TemperatureUnit.CELSIUS
        };

        component.form.markAsDirty();
        component.form.setValue(change);

        tick(500);
        expect(component.valueChange.emit).toHaveBeenCalledWith(change);
      }));
    });

    describe('statusChange', () => {
      beforeEach(() => {
        spyOn(component.statusChange, 'emit').and.callThrough();
      });

      it('should emit an event if the form is valid', () => {
        component.form.setValue({
          value: 0,
          unit: TemperatureUnit.CELSIUS
        });

        expect(component.statusChange.emit).toHaveBeenCalledWith('VALID');
      });

      it('should emit an event if the form is invalid', () => {
        component.form.patchValue({
          value: 0
        });

        expect(component.statusChange.emit).toHaveBeenCalledWith('INVALID');
      });
    });
  });
});
