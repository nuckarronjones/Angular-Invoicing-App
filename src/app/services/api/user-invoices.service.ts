import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { DocumentData } from "../../enums/invoice-document.enum";
import { documentData } from "../../models/document-data.model";

@Injectable({
  providedIn: "root",
})
export class UserInvoicesServiceApi {
  private _allUserInvoices = new BehaviorSubject<null | DocumentData[]>(null);
  public allUserInvoices$ = this._allUserInvoices.asObservable();

  private _currentInvoice = new BehaviorSubject<null | DocumentData>(null);
  public currentInvoice$ = this._currentInvoice.asObservable();

  public setAllUserInvoices(searchKey: string = "_invoice") {
    const invoices: DocumentData[] = Object.keys(localStorage)
      .filter((key) => key.startsWith(searchKey))
      .map((invoiceKey) => JSON.parse(localStorage[invoiceKey]));

    this._allUserInvoices.next(invoices);
  }

  public setCurrentInvoiceById(invoiceId: string | null): void {
    if (!invoiceId) {
      const blankInvoiceDeepCopy = JSON.parse(JSON.stringify(documentData));

      this._currentInvoice.next(blankInvoiceDeepCopy);

      return;
    }
    const currentInvoice =
      this._allUserInvoices.value?.find(
        (invoice) => invoice.id === invoiceId
      ) || null;

    this._currentInvoice.next(currentInvoice);
  }
}
