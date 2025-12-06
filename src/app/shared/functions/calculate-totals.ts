import { FormArray, FormGroup } from "@angular/forms";
import { FormTableValue } from "../../ui/invoice-editor-page/invoice-table/invoice-table.component";
import { FormTableGroup } from "../../pages/invoice-editor-page/invoice-editor-page.component";

export interface RowTotals {
  totalNet: number;
  totalGross: number;
}

export interface OverallTotals {
  netTotal: string;
  vatTotal: string;
  grossTotal: string;
}

export function calculateTotals(row: Partial<FormTableValue>): RowTotals {
  const quantity = row.quantity ?? 0;
  const unitNetPrice = row.unitNetPrice ?? 0;
  const vatPercent = row.vatPercent ?? 0;

  const totalNet = parseFloat((quantity * unitNetPrice).toFixed(2));
  const totalGross = parseFloat(
    (totalNet + (vatPercent / 100) * totalNet).toFixed(2)
  );

  return {
    totalNet: totalNet,
    totalGross: totalGross,
  };
}

export function calculateOverallTotals(
  invoiceTable: FormArray<FormGroup<FormTableGroup>>
): OverallTotals {
  let totalOverallNet = 0;
  let totalOverallVat = 0;
  let totalOverallGross = 0;

  invoiceTable.controls.forEach((row) => {
    totalOverallNet += row.controls.totalNet.value ?? 0;

    totalOverallVat +=
      ((row.controls.vatPercent.value ?? 0) / 100) *
      (row.controls.totalNet.value ?? 0);
  });

  totalOverallGross = totalOverallNet + totalOverallVat;

  return {
    netTotal: totalOverallNet.toFixed(2),
    vatTotal:  totalOverallVat.toFixed(2),
    grossTotal: totalOverallGross.toFixed(2),
  };
}
