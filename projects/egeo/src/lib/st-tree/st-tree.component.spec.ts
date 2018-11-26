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
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { cloneDeep as _cloneDeep } from 'lodash';


import { StTreeComponent } from './st-tree.component';
import { StTreeNode, StTreeEvent } from './st-tree.model';

const mockId: string = 'treeId';
const mockTree: StTreeNode = {
   name: 'root',
   icon: 'icon-folder',
   children: [
      { name: 'node 0', icon: 'icon-folder' },
      { name: 'node 1', icon: 'icon-folder', children: [
         { name: 'node 1.0', icon: 'icon-folder', children: [
            { name: 'node 1.0.0', icon: 'icon-file' },
            { name: 'node 1.0.1', icon: 'icon-file' }
         ]},
         { name: 'node 1.1', icon: 'icon-file' }
      ]},
      { name: 'node 2', icon: 'icon-file' }
   ]
};

@Component({
   template:
      `<st-tree
            [attr.id]="id"
            [collapseChildrenBranch]="collapseChildren"
            [tree]="tree"
            (selectNode)="onSelectNode($event)"
            (toggleNode)="onToggleNode($event)">
      </st-tree>`
})
class TestHostComponent {
   collapseChildren: boolean = true;
   id: string = mockId;
   tree: StTreeNode = mockTree;
   response: StTreeEvent;

   onSelectNode(event: StTreeEvent): void {
      this.response = event;
   }

   onToggleNode(event: StTreeEvent): void {
      this.response = event;
   }
}

let component: StTreeComponent;
let element: HTMLElement;
let fixture: ComponentFixture<StTreeComponent>;

describe('StTreeComponent', () => {

   beforeEach(async(() => {
      TestBed
      .configureTestingModule({
         declarations: [
            StTreeComponent,
            TestHostComponent
         ]
      })
      .compileComponents();
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(StTreeComponent);
      component = fixture.componentInstance;
      component.tree = mockTree;
      fixture.detectChanges();
   });


   it('should init correctly', () => {
      expect(component.node).toEqual(component.tree);
      expect((component as any)._tree).toEqual(component.tree);
   });

   it('should be updated only if model changes', () => {
      let previousTree = (component as any)._tree;
      let newTree = _cloneDeep(mockTree);
      component.tree = newTree;
      fixture.detectChanges();
      expect(component.tree).not.toBe(newTree);
      expect(component.tree).toBe(previousTree);
   });

   it('should show children nodes only when node has property expanded=true', () => {
      expect(fixture.nativeElement.querySelector('.sth-tree-children')).toBeNull();
      let expandedTree = _cloneDeep(mockTree);
      expandedTree.expanded = true;
      component.tree = expandedTree;
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('.sth-tree-children')).not.toBeNull();
   });

   it('should expand node when click on toggle button of a collapsed node', () => {
      expect(fixture.nativeElement.querySelector('.sth-tree-children')).toBeNull();
      let output: StTreeEvent;
      component.toggleNode.subscribe((event: StTreeEvent) => output = event);
      element = fixture.nativeElement.querySelector('.button');
      element.click();
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('.sth-tree-children')).not.toBeNull();
      expect(output.tree.expanded).toBeTruthy();
   });

   it('should expand node when double click on node name of a collapsed node', () => {
      expect(fixture.nativeElement.querySelector('.sth-tree-children')).toBeNull();
      let output: StTreeEvent;
      component.toggleNode.subscribe((event: StTreeEvent) => output = event);
      element = fixture.nativeElement.querySelector('.name');
      element.dispatchEvent(new Event('dblclick'));
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('.sth-tree-children')).not.toBeNull();
      expect(output.tree.expanded).toBeTruthy();
   });

   it('should collapse node when click on toggle button of an expanded node', () => {
      let expandedTree = _cloneDeep(mockTree);
      expandedTree.expanded = true;
      component.tree = expandedTree;
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('.sth-tree-children')).not.toBeNull();

      let output: StTreeEvent;
      component.toggleNode.subscribe((event: StTreeEvent) => output = event);
      element = fixture.nativeElement.querySelector('.button');
      element.click();
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('.sth-tree-children')).toBeNull();
      expect(output.tree.expanded).toBeFalsy();
   });

   it('should collapse all nodes when collapseChildrenBranch=true and click on toggle button of an expanded node', () => {
      component.collapseChildrenBranch = true;
      component.tree = {
         name: 'root',
         icon: 'icon-folder',
         expanded: true,
         children: [
            { name: 'node 0', icon: 'icon-folder', expanded: true },
            { name: 'node 1', icon: 'icon-folder', expanded: true, children: [
               { name: 'node 1.0', icon: 'icon-folder', expanded: true, children: [
                  { name: 'node 1.0.0', icon: 'icon-file', expanded: true },
                  { name: 'node 1.0.1', icon: 'icon-file', expanded: true }
               ]},
               { name: 'node 1.1', icon: 'icon-file', expanded: true }
            ]},
            { name: 'node 2', icon: 'icon-file', expanded: true }
         ]
      };
      fixture.detectChanges();

      let output: StTreeEvent;
      component.toggleNode.subscribe((event: StTreeEvent) => output = event);
      element = fixture.nativeElement.querySelector('.button');
      element.click();
      fixture.detectChanges();
      expect(JSON.stringify(output.tree).indexOf('expanded')).toBe(-1);
   });

   it('should select node when click on node name of an unselected node', (done) => {
      element = fixture.nativeElement.querySelector('.name');
      component.selectNode.subscribe((event: StTreeEvent) => {
         expect(fixture.nativeElement.querySelector('.button')).not.toBeNull();
         expect(JSON.stringify(event.tree).indexOf('selected')).toBeGreaterThanOrEqual(0);
         done();
      });
      element.click();
   });
});
