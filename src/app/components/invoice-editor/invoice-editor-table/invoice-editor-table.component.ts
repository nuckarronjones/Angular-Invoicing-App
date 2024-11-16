import { Component, Input } from "@angular/core";
import { TableModule } from "primeng/table";
import { CommonModule } from "@angular/common";
import { ButtonModule } from "primeng/button";

interface tableUserInputs {
  name: string;
  quantity: number | null;
  quantUnit: number | null;
  unitNetPrice: number | null;
  vatPercentage: number | null;
  totalNet: number | null;
  totalGross: number | null;
}

@Component({
  selector: "app-invoice-editor-table",
  standalone: true,
  imports: [TableModule, CommonModule, ButtonModule],
  templateUrl: "./invoice-editor-table.component.html",
  styleUrls: ["./invoice-editor-table.component.scss"],
})
export class InvoiceEditorTableComponent {
  @Input() userInvoiceEntries?: tableUserInputs[];
  tableRows : tableUserInputs[] = [];

  columns = [
    { field: "name", header: "Name", class: "w-40" },
    { field: "quantity", header: "Quantity" },
    { field: "quantityUnit", header: "Quant. Unit" },
    { field: "unitNetPrice", header: "Unit Net Price" },
    { field: "vat", header: "VAT %" },
    { field: "totalNet", header: "Total Net" },
    { field: "totalGross", header: "Total Gross" },
    {field: "", header: ""}
  ];

  addTableRow():void{
    this.tableRows.push({
      name: "",
      quantity: null,
      quantUnit: null,
      unitNetPrice: null,
      vatPercentage: null,
      totalNet: null,
      totalGross: null,
    })

    console.log("tableRows now, ", this.tableRows);
  }
}
