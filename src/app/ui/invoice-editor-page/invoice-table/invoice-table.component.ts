import {
  Component,
  Input,
  // Output,
  // EventEmitter,
  OnInit,
} from "@angular/core";
import { TableModule } from "primeng/table";
import { CommonModule } from "@angular/common";
import { ButtonModule } from "primeng/button";
import {
  FormArray,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from "@angular/forms";
// import { v4 as uuidv4 } from "uuid";
import { NgIf } from "@angular/common";
import { FormTableGroup } from "../../../pages/invoice-editor-page/invoice-editor-page.component";
import { calculateTotals } from "../../../shared/functions/calculate-totals";
import { createTableFormGroup } from "../../../shared/functions/create-form-groups";
// import { TableUserInputs } from "../../../enums/invoice-document.enum";

export interface FormTableValue {
  item: string | null;
  quantity: number | null;
  unit: "days" | "hours" | "months" | null;
  unitNetPrice: number | null;
  vatPercent: number | null;
  totalNet: number | null;
  totalGross: number | null;
}

@Component({
  selector: "app-invoice-editor-table",
  standalone: true,
  imports: [
    TableModule,
    CommonModule,
    ButtonModule,
    FormsModule,
    NgIf,
    ReactiveFormsModule,
  ],
  templateUrl: "./invoice-table.component.html",
  styleUrls: ["./invoice-table.component.scss"],
})
export class InvoiceEditorTableComponent implements OnInit {
  // @Input() invoiceTableRowData?: TableUserInputs[];
  @Input({ required: true }) editMode!: boolean;
  @Input({ required: true }) invoiceTableForm!: FormArray<
    FormGroup<FormTableGroup>
  >;
  // @Output() formChanges = new EventEmitter();

  // public tableRows: TableUserInputs[] = [];

  ngOnInit(): void {
    // const savedTableRows = this.invoiceTableRowData;
    // //If we have saved data for this invoice saved, we want to populate tableRows OnInit
    // if ((savedTableRows) && savedTableRows.length > 0) {
    //   savedTableRows.forEach((row) => {
    //     //Push saved data from rows into our component table rows
    //     this.tableRows.push(row);
    //   });
    // }
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

  public addNewTableRow(): void {
    // Todo: form validation later if user can add a row or not
    const newRow = createTableFormGroup();

    this.invoiceTableForm.push(newRow);

    newRow.valueChanges.subscribe((row: Partial<FormTableValue>) => {
      const { totalNet, totalGross } = calculateTotals(row);

      newRow.patchValue({ totalNet, totalGross }, { emitEvent: false });
    });
  }

  //Updates calculation for saved invoicing table totals, and updates dom accordingly
  // public updateRowCalculations(rowId: string): void {
  //   const tableRow = document.getElementById(`${rowId}`);
  //   const tableRowArrayObject = this.tableRows.find(
  //     (obj) => obj.rowId === rowId
  //   );

  //   if (tableRowArrayObject && tableRow) {
  //     //For the row with the matching ID, we will use these values to calculate our fields
  //     const quantity = parseFloat(tableRowArrayObject.quantity as string);
  //     const unitNetPrice = parseFloat(tableRowArrayObject.unitNetPrice as string);
  //     const vatPercentage = parseFloat(tableRowArrayObject.vatPercentage as string);
  //     const totalNet = quantity * unitNetPrice;
  //     //Input values we want to malipulate
  //     const totalNetHTML = tableRow?.querySelector('td input[name="totalNet"]') as HTMLInputElement;
  //     const totalGrossHTML = tableRow?.querySelector('td input[name="totalGross"]') as HTMLInputElement;
  //     //Returns calculations into cells as values
  //     const totalNetCalculated = parseFloat((quantity * unitNetPrice).toFixed(2));
  //     const totalGrossCalculated = parseFloat((totalNet + ((vatPercentage / 100) * totalNet)).toFixed(2));
  //     totalNetHTML.value = totalNetCalculated ? totalNetCalculated.toString() : "";
  //     totalGrossHTML.value = totalGrossCalculated
  //       ? totalGrossCalculated.toString()
  //       : totalNetCalculated
  //       ? totalNetCalculated.toString()
  //       : "";

  //     tableRowArrayObject.totalNet = parseFloat(totalNetHTML.value).toFixed(2);
  //     tableRowArrayObject.totalGross = parseFloat(totalGrossHTML.value).toFixed(2);

  //     //We want to signal to the parent component that totals need to be re-calculated, and supply the tableRows with data
  //     this.formChanges.emit(this.tableRows);
  //   }
  // }

  public deleteRowFromTable(tableRow: FormGroup<FormTableGroup>): void {
    const rowIndex = this.invoiceTableForm.controls.indexOf(tableRow);

    this.invoiceTableForm.removeAt(rowIndex);
  }

  // private _addDeleteRowAnimation(id: string) {
  //   const rowElement = document.getElementById(`${id}`);

  //   if (rowElement) {
  //     rowElement.classList.remove("appear-animation");
  //     rowElement.classList.add("slide-out-animation");
  //   }
  // }
}
