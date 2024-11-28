import { Component } from "@angular/core";
import { NavbarComponent } from "./ui/navbar/navbar.component";
import { InvoiceEditorComponent } from "./pages/invoice-editor-page/invoice-editor.component";
import { UserInvoicesComponent } from "./pages/user-invoices-page/user-invoices.component";
import { NgIf } from "@angular/common";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    NavbarComponent,
    InvoiceEditorComponent,
    UserInvoicesComponent,
    NgIf
  ],
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})

export class AppComponent {
  public selectedInvoice = true;
}
