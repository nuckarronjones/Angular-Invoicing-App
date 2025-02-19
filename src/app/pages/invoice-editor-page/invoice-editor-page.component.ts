import { Component, OnInit } from "@angular/core";
import { EditingModeComponent } from "./invoice-edit-mode/editing-mode.component";
import { InvoiceEditModeState } from "../../services/toggle-edit-mode.service";
import { EditorNavbarComponent } from "./editor-navbar/editor-navbar.component";
import { PrintModeComponent } from "./invoice-print-mode/print-mode.component";
import { ActivatedRoute } from "@angular/router";
import { CommonModule } from "@angular/common";
import { AsyncPipe } from "@angular/common";
import { NgIf } from "@angular/common";
import { UserInvoicesService } from "../../services/api/user-invoices.service";

@Component({
  selector: "app-invoice-editor-page",
  standalone: true,
  imports: [
    CommonModule,
    EditingModeComponent,
    NgIf,
    AsyncPipe,
    PrintModeComponent,
    EditorNavbarComponent,
  ],
  templateUrl: "./invoice-editor-page.component.html",
  styleUrl: "./invoice-editor-page.component.scss",
})
export class InvoiceEditorPageComponent implements OnInit {
  constructor(
    public invoiceEditModeState: InvoiceEditModeState,
    private userInvoicesService: UserInvoicesService,
    private _route: ActivatedRoute
  ) {}

  ngOnInit() {
    this._route.paramMap.subscribe((params) => {
      const invoiceId = String(params.get("id"));

      this.userInvoicesService.setUserInvoices(invoiceId);

      this.userInvoicesService.userInvoices$.subscribe((invoice) => {
        if (invoice) {
          this.selectedInvoice = invoice[0];
        }
      });
    });
  }

  public selectedInvoice: any;
}
