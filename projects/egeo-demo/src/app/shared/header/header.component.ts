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

import { Component, ChangeDetectionStrategy, ElementRef, HostListener, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { fromEvent, forkJoin } from 'rxjs';

import { Option, HEADER_OPTIONS } from './header.model';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'demo-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoHeaderComponent implements OnDestroy {

  public activeBackground = false;
  public options: Option[] = HEADER_OPTIONS;

  private _scrollEvent$;

  constructor(router: Router, private _cd: ChangeDetectorRef) {
    router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationEnd) {
          if (event.url === '/home') {
            this.activeBackground = window.scrollY > 100;
            this._subscribeScrollPosition();
          } else {
            this._unsubscrubeScrollPosition();
            this.activeBackground = true;
          }
          this._cd.markForCheck();
      }
    });
  }

  private _subscribeScrollPosition() {
    this._scrollEvent$ = fromEvent(window, 'scroll').subscribe((e: any) => {
      this.activeBackground = window.scrollY > 100;
      this._cd.markForCheck();
    });
  }

  private _unsubscrubeScrollPosition() {
    if (this._scrollEvent$) {
      this._scrollEvent$.unsubscribe();
    }
  }

  ngOnDestroy(): void {
    this._unsubscrubeScrollPosition();
  }

}
