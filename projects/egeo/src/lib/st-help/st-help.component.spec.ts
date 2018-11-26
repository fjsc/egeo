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
import { StHelpComponent } from './st-help.component';

let component: StHelpComponent;
let fixture: ComponentFixture<StHelpComponent>;
let text: string = 'This text will be displayed in our help';
let qaTag: string = 'help-qa-tag';

describe('StHelp', () => {

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         declarations: [StHelpComponent]
      })
         .compileComponents();  // compile template and css
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(StHelpComponent);
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
      expect(fixture.componentInstance.textPosition).toEqual('vertical');

      component.textPosition = 'horizontal';
      fixture.detectChanges();
      expect(fixture.componentInstance.textPosition).toEqual('horizontal');
   });

   it('If themeA is defined, it needs to be applied', () => {
      let el: DebugElement;
      component.qaTag = qaTag;
      component.text = text;
      component.textPosition = 'vertical';
      fixture.detectChanges();
      el = fixture.debugElement.query(By.css('.st-help--vertical'));
      expect(el.nativeElement).toBeDefined();
   });

   it('If themeB is defined, need to be applied', () => {
      let el: DebugElement;
      component.qaTag = qaTag;
      component.text = text;
      component.textPosition = 'horizontal';
      fixture.detectChanges();
      el = fixture.debugElement.query(By.css('.st-help--horizontal'));
      expect(el.nativeElement).toBeDefined();
   });

});
