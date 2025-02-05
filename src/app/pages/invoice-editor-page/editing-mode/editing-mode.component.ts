import { Component } from "@angular/core";
import { NgFor, NgIf } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { CalendarModule } from "primeng/calendar";
import { InputTextModule } from "primeng/inputtext";
import { TableModule } from "primeng/table";

import { ImageUploadComponent } from "../../../ui/invoice-editor-page/image-upload/image-upload.component";
import { InvoiceEditorTableComponent } from "../../../ui/invoice-editor-page/invoice-table/invoice-table.component";
import { InvoiceEditModeService } from "../../../services/invoice-edit-mode.service";

import { documentData } from "../../../models/document-data.model";
import { formFields } from "../../../models/form-fields.model";
import { ITableUserInputs } from "../../../enums/invoice-table.enum";
import { InputFieldComponent } from "../../../ui/invoice-editor-page/input-field/input-field.component";

@Component({
  selector: "app-edit-mode",
  standalone: true,
  imports: [
    InputTextModule,
    FormsModule,
    InvoiceEditorTableComponent,
    CalendarModule,
    TableModule,
    InputFieldComponent,
    NgFor,
    NgIf,
    ImageUploadComponent
  ],
  templateUrl: "./editing-mode.component.html",
  styleUrl: "./editing-mode.component.scss",
})

export class EditingModeComponent {
  constructor(public invoiceEditModeService: InvoiceEditModeService) {}

  public tableData: ITableUserInputs[] = [];
  public formFields = formFields;
  public documentData = documentData;

  public saveImageUrl(event: string): void {
    this.documentData.invoice.form.headerImage = event;
  }

  public reCalculateTotals(tableRows: ITableUserInputs[]): void {
    this._saveTableRowData(tableRows);

    this.documentData.invoice.totals.netTotal = calculateTotal("totalNet");
    this.documentData.invoice.totals.vatTotal = calculateTotal("vatPercentage");
    this.documentData.invoice.totals.grossTotal = calculateTotal("totalGross");

    function calculateTotal(property: keyof (typeof tableRows)[0]): string {
      let accumulator = 0;

      tableRows.forEach((row) => {
        if (row[property]) {
          if(property == "totalNet" || property == "totalGross"){
            accumulator += parseFloat(row[property]);
          }else if(property = "vatPercentage"){
            accumulator += ((parseInt(row[property], 10) / 100) * parseFloat(row["totalNet"]));
          }
        }
      });

      return accumulator ? accumulator.toFixed(2).toString() : "";
    }
  }

  public setInvoiceValues(event: Record<string, any>): void {
    const key = Object.keys(event)[0] as keyof typeof this.documentData.invoice.form; 
    if (key && key in this.documentData.invoice.form) {
      this.documentData.invoice.form[key] = event[key]; 
    } else {
      console.warn(`Key ${key} not found in documentData.form`);
    }
  }

  public getFormValue(key: string): string {
    return this.documentData.invoice.form[key as keyof typeof this.documentData.invoice.form] || '';
  }

  private _saveTableRowData(tableRows: ITableUserInputs[]): void{
    this.documentData.invoice.formTable = tableRows;
  }
  
}
