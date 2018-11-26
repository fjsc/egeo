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
import { Component } from '@angular/core';
import { StTab } from '@stratio/egeo';

@Component({
   selector: 'st-tab-box-demo',
   templateUrl: './st-tab-box-demo.html',
   styleUrls: ['./st-tab-box-demo.scss']
})

export class StTabBoxDemoComponent {
   tabs: StTab[];
   selectedTab: StTab;

   constructor() {
      this.tabs = [{ label: 'Tab1', active: true }, { label: 'Tab2', active: false }];
      this.selectedTab = this.tabs[0];
   }

   onSelectTab(tab: StTab): void {
      this.selectedTab = tab;
   }
}
