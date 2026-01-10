import { Injectable } from "@angular/core";
import { fileToBase64 } from "../../shared/convert-file";
import { InvoiceFormGroup } from "../../pages/invoice-editor-page/invoice-editor-page.component";
import { FormGroup } from "@angular/forms";
import {
  InvoiceDetails,
  InvoiceStatus,
} from "../../pages/user-invoices-page/user-invoices-page.component";

export interface InvoiceDataOutput {
  metaData: InvoiceMetaData;
  header: InvoiceField[];
  headerImage: string | null;
  body: InvoiceField[];
  invoiceTable: InvoiceTableRow[];
  footer: InvoiceFooter;
}

export interface InvoiceMetaData {
  id: string;
  status: InvoiceStatus | null;
  documentName: string | null;
  currency: string | null;
}

export interface InvoiceField {
  id: string | null;
  value: string | null;
}

export interface InvoiceTableRow {
  item: string | null;
  quantity: number | null;
  unit: string | null;
  unitNetPrice: number | null;
  vatPercent: number | null;
  totalNet: number;
  totalGross: number;
}

export interface InvoiceFooter {
  netTotal: string | null;
  vatTotal: string | null;
  grossTotal: string | null;
}

@Injectable({
  providedIn: "root",
})
export class UserInvoicesServiceApi {
  private _invoicesKeyIdentifier = "_invoice";
  private _allUserInvoices: InvoiceDataOutput[] = [];

  constructor() {
    this._loadAllInvoiceData();
  }

  public getInvoiceDetails(): InvoiceDetails[] {
    return this._allUserInvoices.map((data) => {
      return {
        invoiceId: data.metaData.id,
        invoiceNo:
          data.header.find((obj) => obj.id === "invoiceNo")?.value || "",
        invoiceDate:
          data.header.find((obj) => obj.id === "invoiceDate")?.value || "",
        invoiceDueDate:
          data.header.find((obj) => obj.id === "invoiceDueDate")?.value || "",
        grossTotal: data.footer?.grossTotal || "",
        buyer: data.body.find((obj) => obj.id === "buyer")?.value || "",
        status: data.metaData?.status || "",
        currency: data.metaData?.currency || "",
      };
    });
  }

  public getInvoiceById(id: string): InvoiceDataOutput | null {
    return this._allUserInvoices.find((inv) => inv.metaData.id === id) ?? null;
  }

  public updateInvoiceStatus(invoiceId: string, newStatus: InvoiceStatus) {
    const savedInvoice =
      this._allUserInvoices.find(
        (invoice) => invoice.metaData.id === invoiceId
      ) || null;

    if (savedInvoice) {
      savedInvoice.metaData.status = newStatus;

      this._postInvoice(savedInvoice, invoiceId);
    }
  }

  public async saveInvoice(invoice: FormGroup<InvoiceFormGroup>): Promise<void> {
    if (invoice) {
      const invoiceId = invoice.controls.metaData.controls.id.value;
      const formattedInvoice = await  this._mapOutputObject(invoice);

      this._postInvoice(formattedInvoice, invoiceId);
    }
  }

  public deleteInvoice(invoiceId: string): void {
    const cacheIndexToRemove = this._allUserInvoices.findIndex(
      (inv) => inv.metaData.id === invoiceId
    );

    if (cacheIndexToRemove !== -1) {
      // Update cache
      this._allUserInvoices.splice(cacheIndexToRemove, 1);

      // Update local storage
      localStorage.removeItem(invoiceId);
    }
  }

  private _postInvoice(updatedInvoice: InvoiceDataOutput, id: string): void {
    const cacheInvoiceIndex = this._allUserInvoices.findIndex(
      (inv) => inv.metaData.id === updatedInvoice.metaData.id
    );

    // Update cache
    if (cacheInvoiceIndex !== -1) {
      this._allUserInvoices.splice(cacheInvoiceIndex, 1);
    }

    this._allUserInvoices.push(updatedInvoice);

    // Update invoice in storage
    localStorage.setItem(id, JSON.stringify(updatedInvoice));
  }

  private _loadAllInvoiceData(): void {
    this._allUserInvoices = Object.keys(localStorage)
      .filter((key) => key.startsWith(this._invoicesKeyIdentifier))
      .map((invoiceKey) => JSON.parse(localStorage[invoiceKey]));
  }

  private async _mapOutputObject(
    invoice: FormGroup<InvoiceFormGroup>
  ): Promise<InvoiceDataOutput> {
    const file = invoice.controls.headerImage.value;

    return {
      metaData: {
        id: invoice.controls.metaData.controls.id.value,
        status: "Issued" as InvoiceStatus,
        documentName: invoice.controls.metaData.controls.documentName.value,
        currency: "zł",
      },

      header: invoice.controls.header.controls.map((fg) => {
        return {
          id: fg.controls.id.value,
          value: fg.controls.value.value,
        };
      }),

      headerImage: file ? await fileToBase64(file) : null,

      body: invoice.controls.body.controls.map((fg) => {
        return {
          id: fg.controls.id.value,
          value: fg.controls.value.value,
        };
      }),

      invoiceTable: invoice.controls.invoiceTable.controls.map((fg) => {
        return {
          item: fg.controls.item.value,
          quantity: fg.controls.quantity.value,
          unit: fg.controls.unit.value,
          unitNetPrice: fg.controls.unitNetPrice.value,
          vatPercent: fg.controls.vatPercent.value,
          totalNet: fg.controls.totalNet.value ?? 0,
          totalGross: fg.controls.totalGross.value ?? 0,
        };
      }),

      footer: {
        netTotal: invoice.controls.footer.controls.netTotal.value ?? "0",
        vatTotal: invoice.controls.footer.controls.vatTotal.value ?? "0",
        grossTotal: invoice.controls.footer.controls.grossTotal.value ?? "0",
      },
    };
  }
}
