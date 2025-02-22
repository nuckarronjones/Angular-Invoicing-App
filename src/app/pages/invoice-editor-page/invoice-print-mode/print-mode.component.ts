import { Component, OnInit } from "@angular/core";
import { InputTextModule } from "primeng/inputtext";
import { FormsModule } from "@angular/forms";
import { InvoiceEditorTableComponent } from "../../../ui/invoice-editor-page/invoice-table/invoice-table.component";
import { CalendarModule } from "primeng/calendar";
import { TableModule } from "primeng/table";
import { NgFor, NgIf } from "@angular/common";
import { NgClass } from "@angular/common";
import { ImageUploadComponent } from "../../../ui/invoice-editor-page/image-upload/image-upload.component";
import { formFields } from "../../../models/form-fields.model";
import { DocumentData, TableUserInputs } from "../../../enums/invoice-document.enum";
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
export class PrintModeComponent implements OnInit{
  public currentInvoice!: DocumentData;
  public formFields = formFields;

  constructor(
    private _userInvoicesService: UserInvoicesServiceApi
  ){}

  ngOnInit(): void {
    this._userInvoicesService.currentInvoice$.subscribe((currentInvoice)=>{
      if(currentInvoice){
        this.currentInvoice = currentInvoice;
      }
    })
  }

  public saveImageUrl(event: string): void {
    this.formFields.headerImage = event;
  }

  public getFormValue(key: string): string {
    if (this.currentInvoice) {
      return (
        this.currentInvoice.invoice.form[
          key as keyof typeof this.currentInvoice.invoice.form
        ] || ""
      );
    }
    return "";
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
