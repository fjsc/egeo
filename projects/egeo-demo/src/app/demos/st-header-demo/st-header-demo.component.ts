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
import { Component, ChangeDetectionStrategy, ChangeDetectorRef, ElementRef, ViewChild, HostListener } from '@angular/core';
import { StHeaderMenuOption, StLauncherGroup } from '@stratio/egeo';

import { HEADER_MENU, LAUNCHER_ITEMS } from './st-header-demo.model';

@Component({
   selector: 'st-header-demo',
   templateUrl: './st-header-demo.component.html',
   styleUrls: ['./st-header-demo.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class StHeaderDemoComponent {

   public height: string;
   public launcherTitle: string = 'Services';
   public headerMenuSchema: StHeaderMenuOption[] = HEADER_MENU;
   public launcherItems: StLauncherGroup[] = LAUNCHER_ITEMS;
   public showLauncherMenu: boolean = false;

   @ViewChild('launcher') launcherElement: ElementRef;

   constructor(private _cd: ChangeDetectorRef) {}

   onMenuClick(): void {
      this.showLauncherMenu = !this.showLauncherMenu;
   }

   @HostListener('document:click', ['$event'])
   onClickOutside(event: Event): void {
      const expandNewValue: boolean = this.showLauncherMenu && this.launcherElement &&
      this.launcherElement.nativeElement.contains(event.target);

      if (expandNewValue !== this.showLauncherMenu) {
         this.showLauncherMenu = expandNewValue;
      }
   }
}
