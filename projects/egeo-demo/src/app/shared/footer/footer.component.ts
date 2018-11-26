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
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

import { FooterLink } from './footer.model';

@Component({
  selector: 'demo-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {

  @Input() rightsText: string;
  @Input() links: FooterLink[] = [];
  @Input() qaTag: string;
  @Input() image: string;
  @Output() link: EventEmitter<FooterLink> = new EventEmitter<FooterLink>();

  constructor(
     private router: Router
  ) { }

  goToLink(link: FooterLink): void {
     if (link.url) {
        window.open(link.url, '_blank');
     }

     if (link.router) {
        this.router.navigate([link.router]);
     }

     this.link.emit(link);
  }


}
