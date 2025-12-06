import { Component, Input } from "@angular/core";
import { InputTextModule } from "primeng/inputtext";
import { FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";

import { InvoiceEditorTableComponent } from "../../../ui/invoice-editor-page/invoice-table/invoice-table.component";
import { CalendarModule } from "primeng/calendar";
import { TableModule } from "primeng/table";

import { NgFor, NgIf } from "@angular/common";

import { NgClass } from "@angular/common";

import { ImageUploadComponent } from "../../../ui/invoice-editor-page/image-upload/image-upload.component";

import { InvoiceFormGroup } from "../invoice-editor-page.component";
import { InvoiceTotalsComponent } from "../../../ui/invoice-editor-page/invoice-totals/invoice-totals.component";

@Component({
  selector: "app-print-mode",
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    FormsModule,
    InvoiceEditorTableComponent,
    CalendarModule,
    TableModule,
    NgFor,
    NgIf,
    NgClass,
    ImageUploadComponent,
    InvoiceTotalsComponent,
  ],
  templateUrl: "./print-mode.component.html",
  styleUrl: "./print-mode.component.scss",
})
export class PrintModeComponent {
  @Input({ required: true }) invoice!: FormGroup<InvoiceFormGroup>;
}
