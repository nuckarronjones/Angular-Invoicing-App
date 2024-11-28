import { Component } from "@angular/core";
import { NgIf, NgFor } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { InputTextModule } from "primeng/inputtext";
import { CalendarModule } from "primeng/calendar";
import { TableModule } from "primeng/table";

import { InvoiceEditorTableComponent } from "../../../ui/invoice-table/invoice-table.component";
import { InputFieldComponent } from "../../../ui/input-field/input-field.component";
import { ImageUploadComponent } from "./image-upload/image-upload.component";
import { EditorNavbarComponent } from "../editor-navbar/editor-navbar.component";

import { InvoiceEditModeService } from "../../../services/invoice-edit-mode.service";

import { formFields } from "../../../models/form-fields.model";


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
  selector: "app-edit-mode",
  standalone: true,
  imports: [
    InputTextModule,
    FormsModule,
    InvoiceEditorTableComponent,
    CalendarModule,
    TableModule,
    EditorNavbarComponent,
    InputFieldComponent,
    NgFor,
    NgIf,
    ImageUploadComponent
  ],
  templateUrl: "./editing-mode.component.html",
  styleUrl: "./editing-mode.component.scss",
})
export class EditingModeComponent {
  constructor(public invoiceEditModeService: InvoiceEditModeService){}
  public tableData: ITableUserInputs[] = [];
  public editMode = true;
  public formFields = formFields;

  public invoiceData = {
    invoiceNo: "",
    invoiceDate: undefined as Date | undefined,
    currency: "PLN",
    seller: "",
    vatId: "",
    streetNo: "",
    postCode: "",
    city: "",
    bankAccount: "",
    bank: "",
    swift: "",
    buyer: "",
    buyerVAT: "",
    buyerStreetNo: "",
    buyerPostCode: "",
    buyerCity: "",
    tableData: {},
    netTotal: "",
    vatTotal: "",
    grossTotal: "",
  };

  public saveImageUrl(event : string ):void{
    this.formFields.headerImage = event;
  }

  public reCalculateTotals(tableRows: ITableUserInputs[]):void {
    this.invoiceData.tableData = tableRows;

    this.invoiceData.netTotal = calculateTotal("totalNet");
    this.invoiceData.vatTotal = calculateTotal("vatPercentage");
    this.invoiceData.grossTotal = calculateTotal("totalGross");

    function calculateTotal(property: keyof (typeof tableRows)[0]): string {
      let accumulator = 0;

      tableRows.forEach((row) => {
        if (row[property]) {
          accumulator += parseFloat(row[property]);
        }
      });

      return accumulator ? accumulator.toString() : "";
    }
  }
  
}
