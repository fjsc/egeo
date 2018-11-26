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
import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'st-info-card',
  templateUrl: './st-info-card.component.html',
  styleUrls: ['./st-info-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class StInfoCardComponent {
  @Input() photo: string;
  @Input() defaultPhoto: string;
  @Input() title: string;
  @Input() description: string;
  @Input() qaTag: string;

  constructor() {
  }

  onPhotoError(): boolean {
    this.photo = this.defaultPhoto;
    return true;
  }

  generateQaTag(): string {
   return this.qaTag ? 'qaTag-' + this.qaTag : 'qaTag-' + this.title.split(' ').join('-');
  }
}
