import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-inplace-editor',
  templateUrl: './form-inplace-editor.component.html',
  styleUrls: ['./form-inplace-editor.component.css']
})
export class FormInplaceEditorComponent implements OnInit {
  public dateModel: Object = {  placeholder: 'Select date' };
  public dateValue: Date = new Date('11/23/2018');
  public dateTimeValue: Date = new Date('11/23/2018 12:30 PM');
  public frameWorkList: string[] = ['Android', 'JavaScript', 'jQuery', 'TypeScript', 'Angular', 'React', 'Vue', 'Ionic'];
  public dropDownModel: object = { dataSource: this.frameWorkList, placeholder: 'Select frameworks'};
  public maskModel: object = { mask: '000-000-000' };
  public numericModel: object = { placeholder: 'Enter number'};
  public textModel: object = { placeholder: 'Enter some text' };
  public dateRangeValue: Date[] =  [new Date('11/12/2018'), new Date('11/15/2018')];
  public rteModel: object = { placeholder: 'Enter your content here' };
constructor() { }
  ngOnInit(): void {
  }

}
