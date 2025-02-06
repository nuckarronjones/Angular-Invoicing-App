import { Component } from "@angular/core";
import { EditingModeComponent } from "./invoice-edit-mode/editing-mode.component";
import { InvoiceEditModeService } from "../../services/invoice-edit-mode.service";
import { EditorNavbarComponent } from "./editor-navbar/editor-navbar.component";
import { PrintModeComponent } from "./invoice-print-mode/print-mode.component";
import { AsyncPipe } from "@angular/common";
import { NgIf } from "@angular/common";

@Component({
  selector: "app-invoice-editor-page",
  standalone: true,
  imports: [EditingModeComponent, NgIf, AsyncPipe, PrintModeComponent, EditorNavbarComponent],
  templateUrl: "./invoice-editor-page.component.html",
  styleUrl: "./invoice-editor-page.component.scss",
})
export class InvoiceEditorPageComponent {
  constructor(public invoiceEditModeService: InvoiceEditModeService) {}
}
