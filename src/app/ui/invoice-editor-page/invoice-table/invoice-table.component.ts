import {
  Component,
  Input,
} from "@angular/core";
import { TableModule } from "primeng/table";
import { CommonModule, NgClass } from "@angular/common";
import { ButtonModule } from "primeng/button";
import {
  FormArray,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from "@angular/forms";
import { NgIf } from "@angular/common";
import { FormTableGroup } from "../../../pages/invoice-editor-page/invoice-editor-page.component";
import { createTableFormRowGroup } from "../../../shared/create-table-form-group";

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
    NgClass
  ],
  templateUrl: "./invoice-table.component.html",
  styleUrls: ["./invoice-table.component.scss"],
})
export class InvoiceEditorTableComponent{
  @Input({ required: true }) editMode!: boolean;
  @Input({ required: true }) invoiceTableForm!: FormArray<FormGroup<FormTableGroup>>;

  public checkRowValidations: boolean = false;

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
    this.checkRowValidations = true;

    if(!this.invoiceTableForm.invalid){
      const newRow = createTableFormRowGroup();

      this.invoiceTableForm.push(newRow);

      this.checkRowValidations = false;
    }

  }

  public deleteRowFromTable(tableRow: FormGroup<FormTableGroup>): void {
    const rowIndex = this.invoiceTableForm.controls.indexOf(tableRow);

    this.invoiceTableForm.removeAt(rowIndex);
  }
}
