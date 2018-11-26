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
import { ChangeDetectionStrategy, Component, Input} from '@angular/core';

import { StEgeo, StRequired } from '../decorators/require-decorators';

@StEgeo()
@Component({
   selector: 'st-help',
   templateUrl: './st-help.component.html',
   styleUrls: ['./st-help.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class StHelpComponent {

  @Input() @StRequired() text: string = '';
  @Input() qaTag: string;
  @Input() textPosition: 'vertical' | 'horizontal' = 'vertical';

  constructor() {
  }

}
