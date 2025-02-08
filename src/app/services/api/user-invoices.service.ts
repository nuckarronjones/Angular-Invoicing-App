import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UserInvoicesService {
  private _userInvoices = new BehaviorSubject<null | string[]>(null);
  public userInvoices$ = this._userInvoices.asObservable();

  private _currentInvoice = new BehaviorSubject<null | string[]>(null);
  public currentInvoice$ = this._currentInvoice.asObservable();

  public setUserInvoices(searchKey: string = "_invoice") {
    const invoices: any[] = Object.keys(localStorage)
      .filter((key) => key.startsWith(searchKey))
      .map((invoiceKey) => JSON.parse(localStorage[invoiceKey]));

    this._userInvoices.next(invoices);
  }

}
