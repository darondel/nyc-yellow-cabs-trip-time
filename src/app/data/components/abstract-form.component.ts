import { EventEmitter, Injectable, Input, OnChanges, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FloatLabelType, MatFormFieldAppearance, ThemePalette } from '@angular/material';

import { debounceTime, distinctUntilChanged, filter, tap } from 'rxjs/operators';

@Injectable()
export abstract class AbstractFormComponent<T> implements OnChanges {

  @Input() value: T;
  @Input() gridRowHeight: string | number;
  @Input() fieldAppearance: MatFormFieldAppearance;
  @Input() fieldColor: ThemePalette;
  @Input() fieldFloatLabel: FloatLabelType;

  @Output() valueChange = new EventEmitter<T>();
  @Output() statusChange = new EventEmitter<string>();

  form: FormGroup;

  constructor(protected formBuilder: FormBuilder) {
  }

  /**
   * @inheritDoc
   */
  ngOnChanges(changes: SimpleChanges) {
    if (!this.form) {
      this.buildForm();
      this.formChanges();
    }

    const valueChange: SimpleChange = changes.value;

    if (valueChange) {
      this.form.patchValue(valueChange.currentValue);
    }
  }

  /**
   * Returns the form control for a specific key of the type definition.
   *
   * @param id the key
   * @return the associated form control, cannot be null or undefined
   */
  protected abstract getFormControl(id: keyof T): FormControl;

  /**
   * Builds the form by appending a control for each property which belongs to the type definition.
   */
  protected buildForm() {
    let formControls = {};

    for (const key of Object.keys(this.value)) {
      formControls = {...formControls, [key]: this.getFormControl(<keyof T>key)};
    }

    this.form = this.formBuilder.group(formControls);
  }

  /**
   * Listens to form changes and emits an event:
   * <ul>
   * <li>When a value is updated by the user (see {@link FormGroup#dirty}) and is different from the previous one.</li>
   * <li>When the status is updated and is different from the previous one.</li>
   * </ul>
   */
  protected formChanges() {
    this.form.valueChanges
      .pipe(
        filter(() => this.form.dirty),
        tap(() => this.form.markAsPristine()),
        debounceTime(500),
        distinctUntilChanged((value1, value2) => JSON.stringify(value1) === JSON.stringify(value2))
      )
      .subscribe(value => this.valueChange.emit(value));

    this.form.statusChanges
      .pipe(distinctUntilChanged())
      .subscribe(status => this.statusChange.emit(status));
  }

}
