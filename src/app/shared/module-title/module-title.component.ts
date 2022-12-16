import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-module-title',
  templateUrl: './module-title.component.html',
  styleUrls: ['./module-title.component.css']
})
export class ModuleTitleComponent implements OnInit {
  @Input() name?: string;
  @Input() btnTitle?: string;
  @Input() isAddAvailable?: boolean = true;
  @Output() addNew: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }


}
