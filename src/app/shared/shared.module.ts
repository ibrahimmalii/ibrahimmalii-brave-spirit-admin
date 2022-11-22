import { NgModule } from '@angular/core';

import { MenuItems } from './menu-items/menu-items';
import { AccordionAnchorDirective, AccordionLinkDirective, AccordionDirective } from './accordion';
import { GridComponent } from './grid/grid.component';
import {GridModule} from "@syncfusion/ej2-angular-grids";
import {CommonModule} from "@angular/common";
import {DemoMaterialModule} from "../demo-material-module";
import {FlexLayoutModule} from "@angular/flex-layout";
import {NgApexchartsModule} from "ng-apexcharts";
import { ModuleTitleComponent } from './module-title/module-title.component';
import { FormInplaceEditorComponent } from './form-inplace-editor/form-inplace-editor.component';
import { InPlaceEditorAllModule } from '@syncfusion/ej2-angular-inplace-editor';
import {FormsModule} from "@angular/forms";
import { RichTextEditorModule } from '@syncfusion/ej2-angular-richtexteditor';
import { RichTextEditorComponent } from './rich-text-editor/rich-text-editor.component';




@NgModule({
  declarations: [
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    GridComponent,
    ModuleTitleComponent,
    FormInplaceEditorComponent,
    RichTextEditorComponent,
  ],
  exports: [
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    GridComponent,
    ModuleTitleComponent,
    FormInplaceEditorComponent,
    RichTextEditorComponent
   ],
  imports: [
    GridModule,
    CommonModule,
    DemoMaterialModule,
    FlexLayoutModule,
    NgApexchartsModule,
    InPlaceEditorAllModule,
    RichTextEditorModule,
    FormsModule
  ],
  providers: [ MenuItems]
})
export class SharedModule { }
