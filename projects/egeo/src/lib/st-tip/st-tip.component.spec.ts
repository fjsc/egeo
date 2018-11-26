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
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

// Component
import { StTipComponent } from './st-tip.component';

let component: StTipComponent;
let fixture: ComponentFixture<StTipComponent>;
let text: string = 'This text will be displayed in our tip';
let qaTag: string = 'tip-qa-tag';

describe('StTip', () => {

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         declarations: [StTipComponent]
      })
         .compileComponents();  // compile template and css
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(StTipComponent);
      component = fixture.componentInstance;
   });

   it('It should have required inputs defined', () => {
      component.text = text;
      fixture.detectChanges();
      expect(fixture.componentInstance.text).toEqual(text);
   });

   it('It should have theme defined as default', () => {
      component.qaTag = qaTag;
      component.text = text;
      fixture.detectChanges();
      expect(fixture.componentInstance.theme).toEqual('themeA');

      component.theme = 'themeB';
      fixture.detectChanges();
      expect(fixture.componentInstance.theme).toEqual('themeB');
   });

   it('If themeA is defined, it needs to be applied', () => {
      let el: DebugElement;
      component.qaTag = qaTag;
      component.text = text;
      component.theme = 'themeA';
      fixture.detectChanges();
      el = fixture.debugElement.query(By.css('.themeA'));
      expect(el.nativeElement).toBeDefined();
   });

   it('If themeB is defined, it needs to be applied', () => {
      let el: DebugElement;
      component.qaTag = qaTag;
      component.text = text;
      component.theme = 'themeB';
      fixture.detectChanges();
      el = fixture.debugElement.query(By.css('.themeB'));
      expect(el.nativeElement).toBeDefined();
   });

});
