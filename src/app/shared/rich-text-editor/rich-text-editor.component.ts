import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {
  HtmlEditorService,
  ImageService,
  LinkService,
  MarkdownEditorService,
  ToolbarService,
  RichTextEditorComponent as RichLibrary
} from "@syncfusion/ej2-angular-richtexteditor";

@Component({
  selector: 'app-rich-text-editor',
  templateUrl: './rich-text-editor.component.html',
  styleUrls: ['./rich-text-editor.component.css'],
  providers: [ToolbarService, LinkService, ImageService, MarkdownEditorService, HtmlEditorService]
})
export class RichTextEditorComponent implements OnInit {

  constructor() { }

  @ViewChild('typeRTE') theEditor!: RichLibrary;
  mode: string = 'Markdown';
  private htmlContent!: string;

  @Input() content: any;
  @Output() outputContent: EventEmitter<any> = new EventEmitter<any>();


  ngOnInit(): void {

  }

  getFormattedContent() {
  this.htmlContent = this.theEditor.getHtml();
  this.outputContent.emit(this.htmlContent);
  }
}
