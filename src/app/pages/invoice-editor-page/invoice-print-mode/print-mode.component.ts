import { Component, OnInit } from "@angular/core";
import { InputTextModule } from "primeng/inputtext";
import { FormsModule } from "@angular/forms";
import { InvoiceEditorTableComponent } from "../../../ui/invoice-editor-page/invoice-table/invoice-table.component";
import { CalendarModule } from "primeng/calendar";
import { TableModule } from "primeng/table";
import { NgFor, NgIf } from "@angular/common";
import { NgClass } from "@angular/common";
import { ImageUploadComponent } from "../../../ui/invoice-editor-page/image-upload/image-upload.component";
import { formFields } from "../../../config/form-fields.model";
import {
  DocumentData,
  InvoiceFormKeys,
  TableUserInputs,
} from "../../../enums/invoice-document.enum";
import { UserInvoicesServiceApi } from "../../../services/api/user-invoices.service";

@Component({
  selector: "app-print-mode",
  standalone: true,
  imports: [
    InputTextModule,
    FormsModule,
    InvoiceEditorTableComponent,
    CalendarModule,
    TableModule,
    NgFor,
    NgIf,
    NgClass,
    ImageUploadComponent,
  ],
  templateUrl: "./print-mode.component.html",
  styleUrl: "./print-mode.component.scss",
})
export class PrintModeComponent implements OnInit {
  public currentInvoice!: DocumentData;
  public formFields = formFields;
  public tableData: TableUserInputs[] = [];
  public headerImage: string = "";
  public netTotal: number | string = "";
  public vatTotal: number | string = "";
  public grossTotal: number | string = "";
  public currency: string = "";

  constructor(private _userInvoicesService: UserInvoicesServiceApi) {}

  ngOnInit(): void {
    this._userInvoicesService.currentInvoice$.subscribe((currentInvoice) => {
      if (currentInvoice) {
        this.currentInvoice = currentInvoice;
      }
      this._updateInvoiceData();
    });
  }

  public saveImageUrl(event: string): void {
    this.formFields.headerImage = event;
  }

  public getInvoiceFormValueByKey(key: InvoiceFormKeys): string {
    if (this.currentInvoice) {
      return this.currentInvoice.invoice.form[key] || "";
    }
    return "";
  }

  private _updateInvoiceData(): void {
    this.tableData = this.currentInvoice?.invoice.formTable ?? [];
    this.headerImage = this.currentInvoice?.invoice.form.headerImage ?? "";
    this.netTotal = this.currentInvoice?.invoice.totals.netTotal ?? "";
    this.vatTotal = this.currentInvoice?.invoice.totals.vatTotal ?? "";
    this.grossTotal = this.currentInvoice?.invoice.totals.grossTotal ?? "";
    this.currency = this.currentInvoice?.currency ?? "";
  }
}
