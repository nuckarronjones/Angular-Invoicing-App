import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit
} from "@angular/core";
import { TableModule } from "primeng/table";
import { CommonModule } from "@angular/common";
import { ButtonModule } from "primeng/button";
import { FormsModule } from "@angular/forms";
import { v4 as uuidv4 } from "uuid";
import { NgIf } from "@angular/common";
import { ITableUserInputs } from "../../../enums/invoice-document.enum";

@Component({
  selector: "app-invoice-editor-table",
  standalone: true,
  imports: [TableModule, CommonModule, ButtonModule, FormsModule, NgIf],
  templateUrl: "./invoice-table.component.html",
  styleUrls: ["./invoice-table.component.scss"],
})
export class InvoiceEditorTableComponent implements OnInit {
  @Input() invoiceTableRowData?: ITableUserInputs[];
  @Input() editMode!: boolean;
  @Output() formChanges = new EventEmitter();

  public tableRows: ITableUserInputs[] = [];

  ngOnInit(): void {
    const savedTableRows = this.invoiceTableRowData;
    //If we have saved data for this invoice saved, we want to populate tableRows OnInit
    if ((savedTableRows) && savedTableRows.length > 0) {
      savedTableRows.forEach((row) => {
        //Push saved data from rows into our component table rows
        this.tableRows.push(row);
      });
    }
  }

  public columns = [
    { field: "item", header: "Item", class: "w-30" },
    { field: "quantity", header: "Quantity", class: "w-10" },
    { field: "quantityUnit", header: "Quant. Unit" },
    { field: "unitNetPrice", header: "Unit Net Price", class: "w-10" },
    { field: "vat", header: "VAT %", class: "w-10" },
    { field: "totalNet", header: "Total Net" },
    { field: "totalGross", header: "Total Gross" },
    { field: "", header: "" },
  ];

  //When add row button clicked, we want to add rows to later be populated
  public addEmptyTableRow(): void {
    const rowId = uuidv4();

    const canAddNewTableRow = this.tableRows.every((obj) =>
      Object.entries(obj)
        .filter(([key]) => key !== "vatPercentage") // Exclude the vatPercentage key
        .every(([, value]) => value !== null && value !== "")
    );

    if (canAddNewTableRow) {
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
    } else {
      alert("Please fill in missing table data before adding a new row");
    }
  }

  //Updates calculation for saved invoicing table totals, and updates dom accordingly
  public updateRowCalculations(rowId: string): void {
    const tableRow = document.getElementById(`${rowId}`);
    const tableRowArrayObject = this.tableRows.find(
      (obj) => obj.rowId === rowId
    );

    if (tableRowArrayObject && tableRow) {
      //For the row with the matching ID, we will use these values to calculate our fields
      const quantity = parseFloat(tableRowArrayObject.quantity as string);
      const unitNetPrice = parseFloat(tableRowArrayObject.unitNetPrice as string);
      const vatPercentage = parseFloat(tableRowArrayObject.vatPercentage as string);
      const totalNet = quantity * unitNetPrice;
      //Input values we want to malipulate
      const totalNetHTML = tableRow?.querySelector('td input[name="totalNet"]') as HTMLInputElement;
      const totalGrossHTML = tableRow?.querySelector('td input[name="totalGross"]') as HTMLInputElement;
      //Returns calculations into cells as values
      const totalNetCalculated = parseFloat((quantity * unitNetPrice).toFixed(2));
      const totalGrossCalculated = parseFloat((totalNet + ((vatPercentage / 100) * totalNet)).toFixed(2));
      totalNetHTML.value = totalNetCalculated ? totalNetCalculated.toString() : "";
      totalGrossHTML.value = totalGrossCalculated
        ? totalGrossCalculated.toString()
        : totalNetCalculated
        ? totalNetCalculated.toString()
        : "";

      tableRowArrayObject.totalNet = parseFloat(totalNetHTML.value).toFixed(2);
      tableRowArrayObject.totalGross = parseFloat(totalGrossHTML.value).toFixed(2);

      //We want to signal to the parent component that totals need to be re-calculated, and supply the tableRows with data
      this.formChanges.emit(this.tableRows);
    }
  }

  public deleteRowFromTable(id: string): void {
    this._addDeleteRowAnimation(id);

    //Give the animation enough time to finish, then remove row from tableRows
    setTimeout(() => {
      this.tableRows = this.tableRows.filter((row) => {
        return row.rowId !== id;
      });
      this.formChanges.emit(this.tableRows);
    }, 500)
  }

  private _addDeleteRowAnimation(id: string) {
    const rowElement = document.getElementById(`${id}`);

    if (rowElement) {
      rowElement.classList.remove("appear-animation");
      rowElement.classList.add("slide-out-animation");
    }
  }
}
