import { Injectable } from "@angular/core";
// import { BehaviorSubject } from "rxjs";
// import { DocumentData } from "../../enums/invoice-document.enum";
// import { documentData } from "../../models/document-data.model";
// import { generateNewInvoiceId } from "../../functions/generate-invoice-id";
import { InvoiceFormGroup } from "../../pages/invoice-editor-page/invoice-editor-page.component";
import { FormGroup } from "@angular/forms";
import {
  InvoiceDetails,
  InvoiceStatus,
} from "../../pages/user-invoices-page/user-invoices-page.component";

export interface InvoiceDataOutput {
  metaData: InvoiceMetaData;
  header: InvoiceField[];
  headerImage: File | null;
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

  public loadAllSavedInvoices(): InvoiceDetails[] {
    const savedInvoiceData: InvoiceDataOutput[] = Object.keys(localStorage)
      .filter((key) => key.startsWith(this._invoicesKeyIdentifier))
      .map((invoiceKey) => JSON.parse(localStorage[invoiceKey]));

    if (savedInvoiceData) {
      this._allUserInvoices = savedInvoiceData;

      const mappedValues: InvoiceDetails[] = savedInvoiceData.map((data) => {
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

      return mappedValues;
    } else {
      return [];
    }
  }

  // public setCurrentInvoiceById(invoiceId: string | null): void {
  //   const currentInvoice =
  //     this._allUserInvoices.value?.find(
  //       (invoice) => invoice.id === invoiceId
  //     ) || null;

  //   this._currentInvoice.next(currentInvoice);
  // }

  // public setNewCurrentInvoice(): void {
  //   this._currentInvoice.next(this._generateNewInvoice());
  // }

  public updateInvoiceStatus(invoiceId: string, newStatus: InvoiceStatus) {
    const currentInvoice =
      this._allUserInvoices.find(
        (invoice) => invoice.metaData.id === invoiceId
      ) || null;

    if (invoiceId && currentInvoice) {
      currentInvoice.metaData.status = newStatus;

      localStorage.setItem(invoiceId, JSON.stringify(currentInvoice));
    }
  }

  public saveInvoice(invoice: FormGroup<InvoiceFormGroup>): void {
    const invoiceId = invoice.controls.metaData.controls.id.value;

    if (invoiceId && invoice) {
      const output = this._mapOutputObject(invoice);

      localStorage.setItem(invoiceId, JSON.stringify(output));
    }
  }

  public deleteInvoice(invoiceId: string): void {
    localStorage.removeItem(invoiceId);
  }

  // private _generateNewInvoice(): DocumentData {
  //   const blankInvoiceDeepCopy = JSON.parse(JSON.stringify(documentData));

  //   blankInvoiceDeepCopy.id = generateNewInvoiceId();

  //   return blankInvoiceDeepCopy;
  // }

  private _mapOutputObject(invoice: FormGroup<InvoiceFormGroup>): InvoiceDataOutput {
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

      headerImage: invoice.controls.headerImage.value,

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
