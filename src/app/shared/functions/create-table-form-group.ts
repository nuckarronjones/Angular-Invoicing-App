import { FormControl, FormGroup, Validators } from "@angular/forms";
import { FormTableGroup } from "../../pages/invoice-editor-page/invoice-editor-page.component";
import { FormTableValue } from "../../ui/invoice-editor-page/invoice-table/invoice-table.component";
import { calculateTotals } from "./calculate-totals";
import { InvoiceTableRow } from "../../services/api/user-invoices.service";

export function createTableFormRowGroup(row: InvoiceTableRow| null = null): FormGroup<FormTableGroup> {
  const newRow = new FormGroup<FormTableGroup>({
    item: new FormControl(row ? row.item : null, [Validators.required]),
    quantity: new FormControl(row ? row.quantity : null, [Validators.required]),
    unit: new FormControl("days"),
    unitNetPrice: new FormControl(row ? row.unitNetPrice : null, [Validators.required]),
    vatPercent: new FormControl(row ? row.vatPercent : null),
    totalNet: new FormControl(row ? row.totalNet : 0),
    totalGross: new FormControl(row ? row.totalGross : 0),
  });

  newRow.valueChanges.subscribe((row: Partial<FormTableValue>) => {
    const { totalNet, totalGross } = calculateTotals(row);

    newRow.patchValue({ totalNet, totalGross }, { emitEvent: false });
  });
  
  return newRow;
}
