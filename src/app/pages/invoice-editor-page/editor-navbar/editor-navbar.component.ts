import { Component, OnInit, Input } from "@angular/core";
import { MenubarModule } from "primeng/menubar";
import { ButtonModule } from "primeng/button";
import { InvoiceEditModeState } from "../../../services/toggle-edit-mode.service";
import { EditorToolbarService } from "../../../services/editor-toolbar-service";
import { AsyncPipe, NgIf } from "@angular/common";
// import { documentData } from "../../../models/document-data.model";
import { UserInvoicesServiceApi } from "../../../services/api/user-invoices.service";
// import { DocumentData } from "../../../enums/invoice-document.enum";
import { Message } from "primeng/api";
import { MessagesModule } from "primeng/messages";
import { RippleModule } from "primeng/ripple";
import { FormGroup } from "@angular/forms";
import { InvoiceFormGroup } from "../invoice-editor-page.component";

@Component({
  selector: "app-editor-navbar",
  standalone: true,
  imports: [
    MenubarModule,
    ButtonModule,
    AsyncPipe,
    MessagesModule,
    RippleModule,
    NgIf,
  ],
  templateUrl: "./editor-navbar.component.html",
  styleUrl: "./editor-navbar.component.scss",
})
export class EditorNavbarComponent implements OnInit {
  public messages: Message[] | undefined;

  @Input({ required: true }) invoice!: FormGroup<InvoiceFormGroup>;

  constructor(
    public invoiceEditModeState: InvoiceEditModeState,
    private _editorToolbarService: EditorToolbarService,
    private _userInvoicesServiceApi: UserInvoicesServiceApi
  ) {}

  ngOnInit(): void {

  }

  public printInvoice(): void {
    this._editorToolbarService.printInvoice();
  }

  public saveInvoice(): void {
    this._userInvoicesServiceApi.saveInvoice(this.invoice)
    .then(()=>{
      this._renderStatusMessage();
    });
  }

  private _renderStatusMessage(): void {
    this.messages = [
      { severity: "success", summary: "Invoice Saved" },
    ];

    setTimeout(() => {
      this.messages = [];
    }, 1800);
  }
}
