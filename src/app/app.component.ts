import { Component } from "@angular/core";
import { NavbarComponent } from "./ui/navbar/navbar.component";
import { InvoiceEditorPageComponent } from "./pages/invoice-editor-page/invoice-editor-page.component";
import { UserInvoicesPageComponent } from "./pages/user-invoices-page/user-invoices-page.component";
import { NgIf } from "@angular/common";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    NavbarComponent,
    InvoiceEditorPageComponent,
    UserInvoicesPageComponent,
    NgIf
  ],
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})

export class AppComponent {
  public selectedInvoice = true;
}
