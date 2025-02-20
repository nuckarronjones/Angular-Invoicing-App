import { Injectable } from "@angular/core";
import { DocumentData, TableUserInputs } from "../enums/invoice-document.enum";
import { UserInvoicesServiceApi } from "./api/user-invoices.service";

@Injectable({
  providedIn: "root",
})
export class UserInvoiceModelService {
  constructor(
   private _userInvoicesServiceApi: UserInvoicesServiceApi
  ) {
    this._initialSubscription();
  }

  public documentData!: DocumentData;

  public updateTotals(tableRows: TableUserInputs[]): void {
    this.documentData.invoice.totals.netTotal = _calculateTotal("totalNet");
    this.documentData.invoice.totals.vatTotal =
      _calculateTotal("vatPercentage");
    this.documentData.invoice.totals.grossTotal = _calculateTotal("totalGross");

    function _calculateTotal(property: keyof (typeof tableRows)[0]): string {
      let accumulator = 0;

      tableRows.forEach((row) => {
        if (row[property]) {
          if (property == "totalNet" || property == "totalGross") {
            accumulator += parseFloat(row[property]);
          } else if ((property = "vatPercentage")) {
            accumulator +=
              (parseInt(row[property], 10) / 100) * parseFloat(row["totalNet"]);
          }
        }
      });

      return accumulator ? accumulator.toFixed(2).toString() : "";
    }
  }

  public updateFormTableRows(tableRows: TableUserInputs[]): void {
    this.documentData.invoice.formTable = tableRows;
  }

  public setImageUrl(event: string): void {
    this.documentData.invoice.form.headerImage = event;
  }

  public setCellValue(event: Record<string, any>): void {
    const key = Object.keys(
      event
    )[0] as keyof typeof this.documentData.invoice.form;

    if (key && key in this.documentData.invoice.form) {
      this.documentData.invoice.form[key] = event[key];
    } else {
      console.warn(`Key ${key} not found in documentData.form`);
    }
  }

  public getCellValue(key: string): string {
    return (
      this.documentData.invoice.form[
        key as keyof typeof this.documentData.invoice.form
      ] || ""
    );
  }

  private _initialSubscription(): void {
    this._userInvoicesServiceApi.currentInvoice$.subscribe((invoice) => {
      if (invoice) {
        this.documentData = invoice;
      }
    });
  }
}
