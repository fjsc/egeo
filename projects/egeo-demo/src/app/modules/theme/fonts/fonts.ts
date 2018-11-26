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
import { Component, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';

import { Font, FONTS, CATEGORY } from './fonts.model';

@Component({
   selector: 'fonts-demo',
   templateUrl: './fonts.html',
   styleUrls: ['./fonts.scss']
})

export class FontsDemoComponent {

   public fontsList: Font[][] = FONTS;
   public searchValue = '';
   public searchBy = 'name';
   public notification = '';
   public hasNotification = false;
   public opacity = 0;

   public CATEGORY = [
      'Font Family',
      'Font Size',
      'Line Height'
   ]

   private animationInterval: number;

   constructor(private _cd: ChangeDetectorRef) { }

   onSearchResult(search: string): void {
      this.searchValue = search;
   }

   onCopyFontName(name: string): void {
      this.notification = `Copied in clipboard '${name}'`;
      this.animate(true);
   }

   closeNotification(): void {
      this.stopAnimation(false);
      this.animate(false);
   }

   private animate(show: boolean): void {
      this.stopAnimation(true);
      this.hasNotification = true;
      this.animationInterval = setInterval(() => show ? this.increaseOpacity() : this.decreaseOpacity(), 50);
   }

   private stopAnimation(clear: boolean): void {
      if (this.animationInterval) {
         clearInterval(this.animationInterval);
      }
      if (clear) {
         this.hasNotification = false;
      }
   }

   private increaseOpacity(): void {
      if (this.opacity >= 1) {
         this.stopAnimation(false);
         setTimeout(() => this.animate(false), 2000);
      } else {
         this.opacity += 0.05;
         this._cd.markForCheck();
      }
   }

   private decreaseOpacity(): void {
      if (this.opacity <= 0) {
         this.stopAnimation(true);
      } else {
         this.opacity -= 0.05;
         this._cd.markForCheck();
      }
   }
}
