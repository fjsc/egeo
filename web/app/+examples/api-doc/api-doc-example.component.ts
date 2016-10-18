import { Component } from '@angular/core';
import { ApiDoc, TYPES } from '../../shared';

@Component({
   selector: 'api-doc-example',
   template: require('./api-doc-example.component.html'),
   styles: [require('./api-doc-example.component.scss')]
})

export class ApiDocExample {

   public apiDoc: ApiDoc = {
      title: 'Buttons',
      description: 'Create a button with a button or a element to retain the native click function. Use a disabled attribute when a button can’t be clicked.',
      haveModel: true,
      apiSection: {
         description: '(Optional) This table gives you a quick overview of the SLDS CSS classes that can be applied to create buttons.',
         inputs: [
            { paramName: 'Param 1', type: TYPES.OBJ, required: true, details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore' },
            { paramName: 'Param 2', type: TYPES.NUM, required: false, details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore' },
            { paramName: 'Param 3', type: TYPES.STR, required: false, details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore' },
            { paramName: 'Param 4', type: TYPES.OBJ, required: true, details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore' }
         ],
         outputs: [
            { paramName: 'Param 1', type: TYPES.OBJ, required: true, details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore' },
            { paramName: 'Param 2', type: TYPES.OBJ, required: false, details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore' }
         ]
      },
      exampleDesc: `(Optional) The base .slds-button looks like a plain text link. It removes all the styling of the native button. It’s typically used to trigger a modal or display a “like” link. All button variations are built by adding another class to .slds-button. Add the .slds-button--neutral class to create a neutral button, which has a white background and gray border.

      Use a neutral icon button is for buttons with an icon on the left or right (not for stateful buttons). Add the .slds-button--neutral class to .slds-button.`
   };

}