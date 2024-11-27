import { Component } from "@angular/core";
import { InputTextModule } from "primeng/inputtext";
import { FormsModule } from "@angular/forms";
import { InvoiceEditorTableComponent } from "./invoice-table/invoice-table.component";
import { CalendarModule } from "primeng/calendar";
import { TableModule } from "primeng/table";
import { InputFieldComponent } from "../../ui/input-field/input-field.component";
import { NgFor, NgIf } from "@angular/common";
import { NgClass } from "@angular/common";
import { ImageUploadComponent } from "./image-upload/image-upload.component";
import { formFields } from "./form-fields.model";

import { EditorNavbarComponent } from "./editor-navbar/editor-navbar.component";

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
  selector: "app-user-invoice",
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
    NgClass,
    ImageUploadComponent
  ],
  templateUrl: "./user-invoice.component.html",
  styleUrl: "./user-invoice.component.scss",
})
export class UserInvoiceComponent {
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

  changeEditMode() {
    this.editMode = !this.editMode;
  }
  
}
