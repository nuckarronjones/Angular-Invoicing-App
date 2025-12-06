import { FormTableValue } from "../../ui/invoice-editor-page/invoice-table/invoice-table.component";

export interface RowTotals {
  totalNet: number;
  totalGross: number;
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
