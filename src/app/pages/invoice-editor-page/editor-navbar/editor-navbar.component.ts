import { Component, Output, EventEmitter } from "@angular/core";
import { MenubarModule } from "primeng/menubar";
import { ButtonModule } from "primeng/button";
import { InvoiceEditModeState } from "../../../services/toggle-edit-mode.service";
import { EditorToolbarService } from "../../../services/editor-toolbar-service";
import { AsyncPipe } from "@angular/common";

@Component({
  selector: "app-editor-navbar",
  standalone: true,
  imports: [MenubarModule, ButtonModule, AsyncPipe],
  templateUrl: "./editor-navbar.component.html",
  styleUrl: "./editor-navbar.component.scss",
})
export class EditorNavbarComponent {
  @Output() printEvent = new EventEmitter();

  constructor(
    public invoiceEditModeState: InvoiceEditModeState,
    private _editorToolbarService: EditorToolbarService
  ) {}

  public printInvoice(){
    this._editorToolbarService.printInvoice();
  }
  
}
