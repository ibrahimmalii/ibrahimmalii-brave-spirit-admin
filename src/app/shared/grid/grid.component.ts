import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ColumnMenuClickEventArgs, PageSettingsModel, ToolbarItems} from "@syncfusion/ej2-angular-grids";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

  @Input() originalData: any;
  @Input() modifiedData: any;
  pageSettings: PageSettingsModel = { pageSize: 10 };
  toolbarOptions: ToolbarItems[] = ['Search', 'PdfExport', 'Print'];
  @ViewChild('grid')  grid?: GridComponent;
  actionTemplate (data: any){
  console.log(data);
  return `
      <button class="btn btn-primary">Click</button>
    `
}
  activeTemplate(data: any){
    console.log(data);
    return {
      template: `
      <button class="btn btn-primary">Click</button>
    `
    }
  };

  constructor(private _userService: UserService) { }

  ngOnInit(): void {
  }
  toolbarClick(args: ColumnMenuClickEventArgs): void {
    if (args.item.id === 'Grid_pdfexport') { // 'Grid_pdfexport' -> Grid component id + _ + toolbar item name
      console.log('done')
      // this.grid.pdfExport();
    }
  }

  getActivationStatues($event: any) {
    console.log($event);
  }
}
