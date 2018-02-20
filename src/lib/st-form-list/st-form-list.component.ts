/*
 * © 2017 Stratio Big Data Inc., Sucursal en España.
 *
 * This software is licensed under the Apache License, Version 2.0.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the terms of the License for more details.
 *
 * SPDX-License-Identifier: Apache-2.0.
 */
import {
   Component,
   Input,
   ChangeDetectionStrategy,
   forwardRef,
   ChangeDetectorRef,
   ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgForm } from '@angular/forms';

@Component({
   selector: 'st-form-list',
   templateUrl: './st-form-list.html',
   styleUrls: ['./st-form-list.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush,
   providers: [
      { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => StFormListComponent), multi: true }
   ]
})

export class StFormListComponent implements ControlValueAccessor {
   /** @Input {any} [schema=''] JSON schema of items */
   @Input() schema: any;
   /** @Input {string} [buttonLabel='Add one more item'] String displayed in the button to add more items */
   @Input() buttonLabel: string = 'Add one more item';

   @Input() name: string;
   @ViewChild('form') form: NgForm;

   private _value: any = [];

   @Input()
   get value(): any {
      return this._value;
   }

   set value(value: any) {
      if (value && value !== this._value) {
         this._value = value;
         this.onChange(this.value);
         this._cd.markForCheck();
      }
   }

   // Function to call when the value changes.
   onChange(_: any): void {
      this._cd.markForCheck();
   }

   onTouched = () => {
   }

   addItem(): void {
      this._value.push({});
   }

   removeItem(position: number): void {
      this._value.splice(position, 1);
   }

   constructor(private _cd: ChangeDetectorRef) {
   }

   isRequired(propertyName: string): boolean {
      return propertyName && this.schema.required && this.schema.required.indexOf(propertyName) !== -1;
   }

   // When value is received from outside
   writeValue(value: any): void {
      this._value = value;
      this.onChange(value);
      this._cd.markForCheck();
   }

   onChangeProperty(value: any, property: string): void {
      this._value[property] = value;
      this.onChange(this.value);
      this._cd.markForCheck();
   }

   onModelChange(value: any, position: number, propertyName: string): void {
      if (this._value && this._value[position]) {
         this._value[position][propertyName] = value;
      }
   }

   // Registry the change function to propagate internal model changes
   registerOnChange(fn: (_: any) => void): void {
      this.onChange = fn;
   }

   // Registry the touch function to propagate internal touch events TODO: make this function.
   registerOnTouched(fn: () => void): void {
      this.onTouched = fn;
   }

   // Allows Angular to disable the form.
   setDisabledState(disable: boolean): void {
      if (disable) {
         this.form.control.disable();
      } else {
         this.form.control.enable();
      }
   }

}
