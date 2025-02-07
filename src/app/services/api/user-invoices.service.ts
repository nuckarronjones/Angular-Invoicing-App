import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UserInvoicesService {
  private _userInvoices = new BehaviorSubject<null | string[]>(null);

  public userInvoices$ = this._userInvoices.asObservable();

  public getUserInvoices() {
    const invoices: any[] = Object.keys(localStorage)
      .filter((key) => key.startsWith("_invoice"))
      .map((invoiceKey) => JSON.parse(localStorage[invoiceKey]));

    this._userInvoices.next(invoices);
  }
}
