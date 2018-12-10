import { async, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { RoutePointFormComponent } from './route-point-form.component';

describe('RoutePointFormComponent', () => {
  let component: RoutePointFormComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      providers: [
        RoutePointFormComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    component = TestBed.get(RoutePointFormComponent);
  });

  describe('Instantiation', () => {
    it('should instantiate the component', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('Fields', () => {
    describe('minLatitude', () => {
      it('should return the minimum latitude allowed, i.e -90 degrees', () => {
        expect(component.minLatitude).toEqual(-90);
      });
    });

    describe('maxLatitude', () => {
      it('should return the maximum latitude allowed, i.e 90 degrees', () => {
        expect(component.maxLatitude).toEqual(90);
      });
    });

    describe('minLongitude', () => {
      it('should return the minimum longitude allowed, i.e -180 degrees', () => {
        expect(component.minLongitude).toEqual(-180);
      });
    });

    describe('maxLongitude', () => {
      it('should return the maximum longitude allowed, i.e 180 degrees', () => {
        expect(component.maxLongitude).toEqual(180);
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
          lat: 0,
          lng: 0
        });

        tick(500);
        expect(component.valueChange.emit).not.toHaveBeenCalled();
      }));

      it('should emit an event if a value of the form is updated by the user', fakeAsync(() => {
        const change = {
          lat: 0,
          lng: 0
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
          lat: 0,
          lng: 0
        });

        expect(component.statusChange.emit).toHaveBeenCalledWith('VALID');
      });

      it('should emit an event if the form is invalid', () => {
        component.form.patchValue({
          lat: 0
        });

        expect(component.statusChange.emit).toHaveBeenCalledWith('INVALID');
      });
    });
  });
});
