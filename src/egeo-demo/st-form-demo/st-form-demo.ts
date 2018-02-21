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
import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NgForm, FormGroup, FormControl } from '@angular/forms';
import { StInputError } from '@stratio/egeo';

import { JSON_SCHEMA } from './json-schema';

@Component({
   selector: 'st-form-demo',
   templateUrl: 'st-form-demo.html'
})
export class StFormDemoComponent {
   public jsonSchema: any;
   public model: any = {};
   public reactiveForm: FormGroup = new FormGroup({ 'genericNumberInput': new FormControl(this.model.genericNumberInput) });
   public errors: StInputError;
public formControl: FormControl = new FormControl();
   @ViewChild('templateDrivenForm') public templateDrivenForm: NgForm;
   @ViewChild('formModel') public formModel: NgForm;

   constructor(private _cd: ChangeDetectorRef) {
      this.jsonSchema = JSON_SCHEMA;
      this.errors = {
         generic: 'Error',
         required: 'This field is required',
         minLength: 'The field min length is ' + this.jsonSchema.properties['genericNumberInput'].minLength,
         maxLength: 'The field max length is ' + this.jsonSchema.properties['genericNumberInput'].maxLength,
         min: 'The number has to be higher than ' + this.jsonSchema.properties['genericNumberInput'].min,
         max: 'The number has to be minor than ' + this.jsonSchema.properties['genericNumberInput'].max,
         pattern: 'Invalid value'
      };
   }

   showFormStatus(): void {
      console.log(this.formModel.valid);
   }

   updateModel(): void {
      this.templateDrivenForm.controls['genericNumberInput'].setValue(1);
      this.templateDrivenForm.controls['requiredNumber'].setValue(2);

      this._cd.markForCheck();
   }

   onChange(model: any): void {
      this.model = model;
   }

   changeFormStatus(): void {
      if (this.formModel.control.enabled) {
         this.templateDrivenForm.form.disable();
      } else {
         this.templateDrivenForm.form.enable();
      }
   }
}
