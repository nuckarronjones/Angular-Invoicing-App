import { Component, Input } from "@angular/core";
import { NgClass, NgFor, NgIf } from "@angular/common";
import { FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";

import { CalendarModule } from "primeng/calendar";
import { InputTextModule } from "primeng/inputtext";
import { TableModule } from "primeng/table";

import { ImageUploadComponent } from "../../../ui/invoice-editor-page/image-upload/image-upload.component";
import { InvoiceEditorTableComponent } from "../../../ui/invoice-editor-page/invoice-table/invoice-table.component";

import { InvoiceFormGroup } from "../invoice-editor-page.component";
import { InvoiceTotalsComponent } from "../../../ui/invoice-editor-page/invoice-totals/invoice-totals.component";

@Component({
  selector: "app-edit-mode",
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
    ImageUploadComponent,
    NgClass,
    InvoiceTotalsComponent
  ],
  templateUrl: "./editing-mode.component.html",
  styleUrl: "./editing-mode.component.scss",
})
export class EditingModeComponent{
  @Input({ required: true }) invoice!: FormGroup<InvoiceFormGroup>;
}
