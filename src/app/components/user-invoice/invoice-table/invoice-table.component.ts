import { Component, Input, Output, EventEmitter } from "@angular/core";
import { TableModule } from "primeng/table";
import { CommonModule } from "@angular/common";
import { ButtonModule } from "primeng/button";
import { FormsModule } from "@angular/forms";
import { v4 as uuidv4 } from "uuid";
import { NgIf } from "@angular/common";

interface tableUserInputs {
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
  selector: "app-invoice-editor-table",
  standalone: true,
  imports: [TableModule, CommonModule, ButtonModule, FormsModule, NgIf],
  templateUrl: "./invoice-table.component.html",
  styleUrls: ["./invoice-table.component.scss"],
})

export class InvoiceEditorTableComponent {
  @Input() userInvoiceEntries?: tableUserInputs[];
  @Input() editMode!: boolean;
  @Output()formChanges = new EventEmitter();
  tableRows: tableUserInputs[] = []; //Row data will be inserted upon saving the changes

  columns = [
    { field: "name", header: "Name", class: "w-40" },
    { field: "quantity", header: "Quantity" },
    { field: "quantityUnit", header: "Quant. Unit" },
    { field: "unitNetPrice", header: "Unit Net Price" },
    { field: "vat", header: "VAT %" },
    { field: "totalNet", header: "Total Net" },
    { field: "totalGross", header: "Total Gross" },
    { field: "", header: "" },
  ];

  public addTableRow(): void {
    const rowId = uuidv4();
    this.tableRows.push({
      rowId: rowId,
      name: "",
      quantity: "",
      quantUnit: "",
      unitNetPrice: "",
      vatPercentage: "",
      totalNet: "",
      totalGross: "",
    });
  }
  
  public updateCalculations(rowId: string): void {
    const tableRow = document.getElementById(`${rowId}`);
    const tableRowArrayObject = this.tableRows.find((obj)=> obj.rowId === rowId)

    if(tableRowArrayObject && tableRow){
      //For the row with the matching ID, we will use these values to calculate our fields
      const quantity = parseFloat(tableRowArrayObject.quantity as string);
      const unitNetPrice = parseFloat(tableRowArrayObject.unitNetPrice as string);
      const vatPercentage = parseFloat(tableRowArrayObject.vatPercentage as string);
      //Input values we want to malipulate
      const totalNetHTML= tableRow?.querySelector('td input[name="totalNet"]') as HTMLInputElement;
      const totalGrossHTML =tableRow?.querySelector('td input[name="totalGross"]') as HTMLInputElement;
      //Returns calculations into cells as values
      const totalNetCalculated = (quantity * unitNetPrice);
      const totalGrossCalculated = (quantity * (unitNetPrice + (unitNetPrice * (vatPercentage / 1000))));

      totalNetHTML.value = totalNetCalculated ? totalNetCalculated.toString() : "";
      totalGrossHTML.value = totalGrossCalculated 
        ? totalGrossCalculated.toString() 
        : totalNetCalculated 
        ? totalNetCalculated.toString() 
        : "";
      //Set the object reference values
      tableRowArrayObject.totalNet = totalNetHTML.value;
      tableRowArrayObject.totalGross = totalGrossHTML.value;
      //We want to signal to the parent component that totals need to be re-calcualted, and supply the tableRows with data
      this.formChanges.emit(this.tableRows);
    }
  }

  public deleteRow(id : string) : void{
    this.tableRows = this.tableRows.filter((row)=>{
      return row.rowId !== id;
    })
    //We deleted a row, so we naturally want to recalculate our invoice totals in the invoice-editor component
    this.formChanges.emit(this.tableRows);
  }

}
