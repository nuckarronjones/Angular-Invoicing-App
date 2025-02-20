import { Component, Output, EventEmitter, OnInit } from "@angular/core";
import { MenubarModule } from "primeng/menubar";
import { ButtonModule } from "primeng/button";
import { InvoiceEditModeState } from "../../../services/toggle-edit-mode.service";
import { EditorToolbarService } from "../../../services/editor-toolbar-service";
import { AsyncPipe } from "@angular/common";
import { documentData } from "../../../models/document-data.model";
import { generateNewInvoiceId } from "../../../functions/generate-invoice-id";
import { UserInvoicesServiceApi } from "../../../services/api/user-invoices.service";
import { DocumentData } from "../../../enums/invoice-document.enum";

@Component({
  selector: "app-editor-navbar",
  standalone: true,
  imports: [MenubarModule, ButtonModule, AsyncPipe],
  templateUrl: "./editor-navbar.component.html",
  styleUrl: "./editor-navbar.component.scss",
})
export class EditorNavbarComponent implements OnInit {
  private currentInvoice: DocumentData = documentData;

  @Output() printEvent = new EventEmitter();

  constructor(
    public invoiceEditModeState: InvoiceEditModeState,
    private _editorToolbarService: EditorToolbarService,
    private _userInvoicesServiceApi: UserInvoicesServiceApi
  ) {}

  ngOnInit(): void {
    this._userInvoicesServiceApi.currentInvoice$.subscribe((invoice) => {
      if (invoice) {
        this.currentInvoice = invoice;
      }else{
        this.currentInvoice.id = generateNewInvoiceId();
      }
    });
  }

  public printInvoice(): void {
    this._editorToolbarService.printInvoice();
  }

  public saveInvoice(): void {
    this._editorToolbarService.saveInvoice(this.currentInvoice.id, this.currentInvoice);
  }

}
