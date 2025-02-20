import { Component, OnInit } from "@angular/core";
import { NgFor, NgIf } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { CalendarModule } from "primeng/calendar";
import { InputTextModule } from "primeng/inputtext";
import { TableModule } from "primeng/table";

import { ImageUploadComponent } from "../../../ui/invoice-editor-page/image-upload/image-upload.component";
import { InvoiceEditorTableComponent } from "../../../ui/invoice-editor-page/invoice-table/invoice-table.component";
import { InvoiceEditModeState } from "../../../services/toggle-edit-mode.service";
import { UserInvoiceModelService } from "../../../services/user-invoice-model.service";

import { formFields } from "../../../models/form-fields.model";
import { DocumentData, TableUserInputs } from "../../../enums/invoice-document.enum";
import { InputFieldComponent } from "../../../ui/invoice-editor-page/input-field/input-field.component";
import { UserInvoicesServiceApi} from "../../../services/api/user-invoices.service";

@Component({
  selector: "app-edit-mode",
  standalone: true,
  imports: [
    InputTextModule,
    FormsModule,
    InvoiceEditorTableComponent,
    CalendarModule,
    TableModule,
    InputFieldComponent,
    NgFor,
    NgIf,
    ImageUploadComponent,
  ],
  templateUrl: "./editing-mode.component.html",
  styleUrl: "./editing-mode.component.scss",
})
export class EditingModeComponent implements OnInit{
  public currentInvoice!: DocumentData;

  constructor(
    public invoiceEditModeState: InvoiceEditModeState,
    private _userInvoiceModelService: UserInvoiceModelService,
    private _userInvoicesService: UserInvoicesServiceApi
  ) {}

  public formFields = formFields;

  ngOnInit(): void {
    this._userInvoicesService.currentInvoice$.subscribe((currentInvoice)=>{
      if(currentInvoice){
        this.currentInvoice = currentInvoice;
      }
    })
  }

  public saveImageUrl(event: string): void {
    this._userInvoiceModelService.setImageUrl(event);
  }

  public recalculateTableRows(tableRows: TableUserInputs[]): void {
    this._userInvoiceModelService.updateFormTableRows(tableRows);
    this._userInvoiceModelService.updateTotals(tableRows);
  }

  public updateInvoiceModelObject(event: Record<string, any>): void {
    this._userInvoiceModelService.setCellValue(event);
  }

  public getFormValue(key: string): string {
    if (this.currentInvoice) {
      return (
        this.currentInvoice.invoice.form[
          key as keyof typeof this.currentInvoice.invoice.form
        ] || ""
      );
    } else {
      return "";
    }
  }

  public get tableData(): TableUserInputs[] {
    return this.currentInvoice?.invoice.formTable;
  }

  public get headerImage(): string {
    return this.currentInvoice?.invoice.form.headerImage ?? "";
  }

  public get netTotal(): number | string {
    return this.currentInvoice?.invoice.totals.netTotal ?? "";
  }

  public get vatTotal(): number | string {
    return this.currentInvoice?.invoice.totals.vatTotal ?? "";
  }

  public get grossTotal(): number | string {
    return this.currentInvoice?.invoice.totals.grossTotal ?? "";
  }
}
