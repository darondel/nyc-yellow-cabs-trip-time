import { async, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import * as moment from 'moment';

import { InformationFormComponent } from './information-form.component';

describe('InformationFormComponent', () => {
  let component: InformationFormComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      providers: [
        InformationFormComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    component = TestBed.get(InformationFormComponent);
  });

  describe('Instantiation', () => {
    it('should instantiate the component', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('Fields', () => {
    describe('passengerVolumeValues', () => {
      it('should compute passenger volume range based on min and max component inputs', () => {
        component.minPassengerVolume = 1;
        component.maxPassengerVolume = 7;

        expect(component.passengerVolumeValues).toBeTruthy();
        expect(component.passengerVolumeValues).toEqual([1, 2, 3, 4, 5, 6, 7]);
      });
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
          departureTime: '',
          passengerVolume: 1
        });

        tick(500);
        expect(component.valueChange.emit).not.toHaveBeenCalled();
      }));

      it('should emit an event if a value of the form is updated by the user', fakeAsync(() => {
        const change = {
          departureTime: '',
          passengerVolume: 1
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
          departureTime: moment().add(2, 'hours'),
          passengerVolume: 1
        });

        expect(component.statusChange.emit).toHaveBeenCalledWith('VALID');
      });

      it('should emit an event if the form is invalid', () => {
        component.form.patchValue({
          departureTime: moment().add(2, 'hours')
        });

        expect(component.statusChange.emit).toHaveBeenCalledWith('INVALID');
      });
    });
  });
});
