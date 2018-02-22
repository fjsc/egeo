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
    Output,
    OnInit,
    forwardRef,
    ChangeDetectorRef,
    ViewChild,
    EventEmitter,
    ChangeDetectionStrategy,
    OnChanges,
    SimpleChanges
} from '@angular/core';
import {
    ControlValueAccessor,
    NG_VALUE_ACCESSOR,
    NgForm,
    NG_VALIDATORS,
    FormControl,
    NgModelGroup
} from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
    selector: 'st-form',
    templateUrl: './st-form.component.html',
    styleUrls: ['./st-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => StFormComponent), multi: true },
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => StFormComponent), multi: true }
    ]
})

export class StFormComponent implements ControlValueAccessor, OnInit, OnChanges {
    @Input() schema: any;
    @Input() name: string;
    @ViewChild('form') form: NgForm;


    @Input() value: any = {};
    @Output() valueChange = new EventEmitter<any>();

    private _value: any = {};
    private valueChangeSub: Subscription;



    // Function to call when the value changes.
    onChange(_: any): void {
        this._cd.markForCheck();
    }

    onTouched = () => {
    }

    constructor(private _cd: ChangeDetectorRef) {
    }

    ngOnChanges(changes: SimpleChanges): void {
       // console.log('changess!', changes)
    }

    validate(control: FormControl): any {
        // console.log('validate  del form ', this.form)
        let errors: any = null;
        if (this.form) {
            Object.keys(this.form.controls).forEach((propertyName) => {
                if (this.form.controls[propertyName] && this.form.controls[propertyName].errors) {
                    if (!errors) {
                        errors = {}
                    }
                    errors[propertyName] = this.form.controls[propertyName].errors;
                }
            });

            this.form.control.setErrors(errors);
            //console.log(errors);
        }
        return errors;

    }

    ngOnInit(): void {
        Object.keys(this.schema.properties).forEach(propertyName => {
            let property: any = this.schema.properties[propertyName];
            if (property.default && this.value[propertyName] === undefined) {
                this._value[propertyName] = property.default;
            }
        });
    }

    isRequired(propertyName: string): boolean {
        return propertyName && this.schema.required && this.schema.required.indexOf(propertyName) !== -1;
    }

    // When value is received from outside
    writeValue(value: any): void {
        this._value = value;
        this.onChange(value);
    }

    onChangeProperty(value: any, property: string): void {
        setTimeout(() => {
            this._value[property] = value;
            this.valueChange.emit(this._value);
            this.onChange(this._value);
        });
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
