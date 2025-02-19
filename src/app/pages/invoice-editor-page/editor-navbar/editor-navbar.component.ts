import { Component, Output, EventEmitter, Input, OnInit } from "@angular/core";
import { MenubarModule } from "primeng/menubar";
import { ButtonModule } from "primeng/button";
import { InvoiceEditModeState } from "../../../services/toggle-edit-mode.service";
import { EditorToolbarService } from "../../../services/editor-toolbar-service";
import { AsyncPipe } from "@angular/common";
import { documentData } from "../../../models/document-data.model";
import { generateNewInvoiceId } from "../../../functions/generate-invoice-id";

@Component({
  selector: "app-editor-navbar",
  standalone: true,
  imports: [MenubarModule, ButtonModule, AsyncPipe],
  templateUrl: "./editor-navbar.component.html",
  styleUrl: "./editor-navbar.component.scss",
})
export class EditorNavbarComponent implements OnInit {
  @Input() currentInvoice?: any = null;
  @Output() printEvent = new EventEmitter();

  constructor(
    public invoiceEditModeState: InvoiceEditModeState,
    private _editorToolbarService: EditorToolbarService
  ) {}

  ngOnInit(): void {
    if (!this.currentInvoice) {
      this.currentInvoice = this._createBlankDocument();
      this.newInvoiceID = generateNewInvoiceId();
      this.currentInvoice.id = this.newInvoiceID;
    }
  }

  public newInvoiceID: string = "";

  public printInvoice(): void {
    this._editorToolbarService.printInvoice();
  }

  public saveInvoice(): void {
    const invoiceId = this.currentInvoice.invoiceId
      ? this.currentInvoice.invoiceId
      : this.newInvoiceID;

    this._editorToolbarService.saveInvoice(invoiceId, this.currentInvoice);
  }

  private _createBlankDocument(): any {
    return documentData;
  }
}
