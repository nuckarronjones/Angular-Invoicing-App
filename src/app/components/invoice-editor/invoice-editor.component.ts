import { Component } from "@angular/core";
import { InputTextModule } from "primeng/inputtext";
import { FormsModule } from "@angular/forms"; // Import FormsModule
import { InvoiceEditorTableComponent } from "./invoice-editor-table/invoice-editor-table.component";
import { CalendarModule } from "primeng/calendar";
import { TableModule } from "primeng/table";

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
  selector: "app-invoice-editor",
  standalone: true,
  imports: [
    InputTextModule,
    FormsModule,
    InvoiceEditorTableComponent,
    CalendarModule,
    TableModule
  ],
  templateUrl: "./invoice-editor.component.html",
  styleUrl: "./invoice-editor.component.scss",
})
export class InvoiceEditorComponent {
  public tableData: ITableUserInputs[] = [];

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

  reCalculateTotals(tableRows: ITableUserInputs[]) {
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

      return accumulator ? accumulator.toString() : '';
    }

    console.log(this.invoiceData);
  }
}
