import { Component } from "@angular/core";
import { InputTextModule } from "primeng/inputtext";
import { FormsModule } from "@angular/forms";
import { InvoiceEditorTableComponent } from "../../../ui/invoice-table/invoice-table.component";
import { CalendarModule } from "primeng/calendar";
import { TableModule } from "primeng/table";
import { NgFor, NgIf } from "@angular/common";
import { NgClass } from "@angular/common";
import { ImageUploadComponent } from "../editing-mode/image-upload/image-upload.component";

import { EditorNavbarComponent } from "../editor-navbar/editor-navbar.component";

import { formFields } from "../../../models/form-fields.model";
import { documentData } from "../../../models/document-data.model";

interface ITableUserInputs {
  rowId: string;
  name: string;
  quantity: string;
  quantUnit: string;
  unitNetPrice: string;
  vatPercentage: string;
  totalNet: string;
  totalGross: string;
}

@Component({
  selector: "app-print-mode",
  standalone: true,
  imports: [
    InputTextModule,
    FormsModule,
    InvoiceEditorTableComponent,
    CalendarModule,
    TableModule,
    EditorNavbarComponent,
    NgFor,
    NgIf,
    NgClass,
    ImageUploadComponent
  ],
  templateUrl: "./print-mode.component.html",
  styleUrl: "./print-mode.component.scss",
})
export class PrintModeComponent {
  public tableData: ITableUserInputs[] = [];
  public editMode = true;
  public formFields = formFields;
  public documentData = documentData;

  public saveImageUrl(event : string ):void{
    this.formFields.headerImage = event;
  }

  public getFormValue(key: string): string {
    return this.documentData.invoice.form[key as keyof typeof this.documentData.invoice.form] || '';
  }
  
}
