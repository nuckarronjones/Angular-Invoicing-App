import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { DocumentData } from "../../enums/invoice-document.enum";
import { documentData } from "../../models/document-data.model";
import { generateNewInvoiceId } from "../../functions/generate-invoice-id";

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
    const currentInvoice =
      this._allUserInvoices.value?.find(
        (invoice) => invoice.id === invoiceId
      ) || null;

    this._currentInvoice.next(currentInvoice);
  }

  public setNewCurrentInvoice(): void{
    this._currentInvoice.next(this._generateNewInvoice());
  }

  private _generateNewInvoice (): DocumentData{
  public saveInvoice(invoiceId: string, currentInvoice: any): void {
    localStorage.setItem(invoiceId, JSON.stringify(currentInvoice));
  }
    const blankInvoiceDeepCopy = JSON.parse(JSON.stringify(documentData));

    blankInvoiceDeepCopy.id = generateNewInvoiceId();

    return blankInvoiceDeepCopy

  }
}
