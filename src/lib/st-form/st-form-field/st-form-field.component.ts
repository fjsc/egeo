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
   OnInit,
   Input,
   Output,
   forwardRef,
   ChangeDetectionStrategy,
   EventEmitter,
   ChangeDetectorRef,
   ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl, NG_VALIDATORS, NgModel } from '@angular/forms';
import { StInputError } from '../../st-input/st-input.error.model';
import { StEgeo, StRequired } from '../../decorators/require-decorators';

@StEgeo()
@Component({
   selector: 'st-form-field',
   templateUrl: './st-form-field.component.html',
   styleUrls: ['./st-form-field.component.scss'],
   providers: [
      { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => StFormFieldComponent), multi: true },
      { provide: NG_VALIDATORS, useExisting: forwardRef(() => StFormFieldComponent), multi: true }
   ],
   changeDetection: ChangeDetectionStrategy.OnPush,
   host: {class: 'st-form-field'}
})

export class StFormFieldComponent implements ControlValueAccessor, OnInit {
   @Input() @StRequired() schema: any;
   @Input() required: boolean = false;
   @Input() errorMessages: StInputError;
   @Input() qaTag: string;
   @Input() name: string;
   @ViewChild('templateModel') templateModel: NgModel;


   @Input() value: any;
   @Output() valueChange = new EventEmitter<any>();

   public disabled: boolean = false; // To check disable
   public focus: boolean = false;
   public errorMessage: string = undefined;

   constructor(private _cd: ChangeDetectorRef) {
   }

   onChange = (_: any) => {
   }

   onTouched = () => {
   }

   setValue(value: any) {
      this.onChange(value);
      this.valueChange.emit(value);
   }

   validate(control: FormControl): any {
      if (this.templateModel && this.templateModel.control && this.templateModel.control.validator) {
         this.templateModel.control.setErrors(this.templateModel.control.validator(control));
      }

      return this.templateModel.errors;
   }

   ngOnInit(): void {
      if (this.schema.value.default !== undefined && this.value === undefined) {
         this.value = this.schema.value.default;
      }
      if (!this.errorMessages) {
         this.errorMessages = {
            generic: 'Error',
            required: 'This field is required',
            minLength: 'The field min length is ' + this.schema.value.minLength,
            maxLength: 'The field max length is ' + this.schema.value.maxLength,
            min: 'The number has to be higher than ' + this.min,
            max: 'The number has to be minor than ' + this.max,
            pattern: 'Invalid value'
         };
      }
   }

   get type(): string {
      switch (this.schema.value.type) {
         case 'string':
            return 'text';
         case 'integer':
            return 'number';
         default:
            return this.schema.value.type;
      }
   }

   get min(): number {
      return this.schema.value.exclusiveMinimum ? this.schema.value.minimum + 1 : this.schema.value.minimum;
   }

   get max(): number {
      return this.schema.value.exclusiveMaximum ? this.schema.value.maximum - 1 : this.schema.value.maximum;
   }

   get label(): string {
      return this.schema.value.title;
   }

   get placeholder(): string {
      return this.schema.value.placeholder || '';
   }

   get description(): string {
      return this.schema.value.description;
   }

   get minLength(): number {
      return this.schema.value.minLength;
   }

   get maxLength(): number {
      return this.schema.value.maxLength;
   }

   get pattern(): string {
      return this.schema.value.pattern;
   }

   hasType(type: string): boolean {
      switch (type) {
         case 'input':
            return this.type === 'text' || this.type === 'number' || this.type === 'integer';
         default:
            return this.type === type;
      }
   }

   writeValue(value: any): void {
      if (value !== undefined) {
         this.valueChange.emit(value);
         this.onChange(value);
      }
   }

   registerOnChange(fn: (_: any) => void): void {
      this.onChange = fn;
   }

   registerOnTouched(fn: () => void): void {
      this.onTouched = fn;
   }

   setDisabledState(disable: boolean): void {
      if (this.templateModel && this.templateModel.control) {
         if (disable) {
            this.templateModel.control.disable();
         } else {
            this.templateModel.control.enable();
         }
      }
   }

   getInputStep(): string {
      if (this.schema.value.type === 'number') {
         return '0.1';
      } else {
         return '1';

      }
   }
}

