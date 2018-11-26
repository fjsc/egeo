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
import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { StDropdownMenuItemComponent } from './st-dropdown-menu-item/st-dropdown-menu-item.component';
import { StDropdownMenuComponent } from './st-dropdown-menu.component';
import { StPopModule } from '../st-pop/st-pop.module';

@NgModule({
   imports: [CommonModule, StPopModule],
   declarations: [StDropdownMenuComponent, StDropdownMenuItemComponent],
   exports: [StDropdownMenuComponent]
})
export class StDropdownMenuModule { }
