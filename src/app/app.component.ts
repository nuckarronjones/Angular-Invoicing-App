import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { UserInvoiceComponent } from "./components/user-invoice/user-invoice.component";
import { UserInvoicesComponent } from "./components/user-invoices/user-invoices.component";
import { NgIf } from "@angular/common";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    UserInvoiceComponent,
    UserInvoicesComponent,
    NgIf
  ],
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  selectedInvoice = true;
}
