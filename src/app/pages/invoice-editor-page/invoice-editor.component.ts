import { Component } from "@angular/core";
import { EditingModeComponent } from "./editing-mode/editing-mode.component";
import { InvoiceEditModeService } from "../../services/invoice-edit-mode.service";
import { PrintModeComponent } from "./print-mode/print-mode.component";
import { AsyncPipe } from "@angular/common";
import { NgIf } from "@angular/common";

@Component({
  selector: "app-invoice-editor",
  standalone: true,
  imports: [EditingModeComponent, NgIf, AsyncPipe, PrintModeComponent],
  templateUrl: "./invoice-editor.component.html",
  styleUrl: "./invoice-editor.component.scss",
})
export class InvoiceEditorComponent {
  constructor(public invoiceEditModeService: InvoiceEditModeService) {}
}
