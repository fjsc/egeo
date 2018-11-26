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

import { createCustomElement } from '@angular/elements';
import { ANALYZE_FOR_ENTRY_COMPONENTS, NgModule } from '@angular/core';

export function StElementModule(elements: Array<any>): any {

  return function (target: any): any {
    target.withElements = function (components: any[]): any {
      return {
        ngModule: target,
        providers: [
          { provide: ANALYZE_FOR_ENTRY_COMPONENTS, useValue: components, multi: true }
        ]
      };
    };
    target.prototype.ngDoBootstrap = function (): void {
      elements.forEach(element => {
        const el = createCustomElement(element, { injector: this.injector });
        customElements.define('framework-poll', el);
      });
    };
  };
}



