import { Component, OnInit } from "@angular/core";
import { EditingModeComponent } from "./invoice-edit-mode/editing-mode.component";
import { InvoiceEditModeState } from "../../services/toggle-edit-mode.service";
import { EditorNavbarComponent } from "./editor-navbar/editor-navbar.component";
import { PrintModeComponent } from "./invoice-print-mode/print-mode.component";
import { CommonModule } from "@angular/common";
import { AsyncPipe } from "@angular/common";
import { NgIf } from "@angular/common";
import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { FormTableValue } from "../../ui/invoice-editor-page/invoice-table/invoice-table.component";
import {
  calculateOverallTotals,
  calculateTotals,
} from "../../shared/functions/calculate-totals";
import { createTableFormGroup } from "../../shared/functions/create-table-form-group";

interface InputField {
  id: string;
  label: string;
  placeholder: string;
  inputType: "date" | "text";
  style: "w-100" | "w-50" | "w-50 inline-block";
  column: "left" | "right";
}

interface FormConfig {
  header: ReadonlyArray<InputField>;
  body: ReadonlyArray<InputField>;
}

export interface InvoiceField {
  id: string;
  label: string;
  placeholder: string;
  inputType: "text" | "date";
  style: string;
  column: "left" | "right";
}

export interface InvoiceFieldsConfig {
  header: InvoiceField[];
  body: InvoiceField[];
}

const invoiceConfig: FormConfig = {
  header: [
    {
      id: "invoiceNo",
      label: "Invoice No:",
      placeholder: "Enter Invoice No",
      inputType: "text",
      style: "w-50",
      column: "left",
    },
    {
      id: "invoiceDate",
      label: "Invoice Date:",
      placeholder: "",
      inputType: "date",
      style: "w-50",
      column: "left",
    },
    {
      id: "invoiceDueDate",
      label: "Invoice Due Date:",
      placeholder: "",
      inputType: "date",
      style: "w-50",
      column: "left",
    },
    {
      id: "invoiceType",
      label: "Invoice Type:",
      placeholder: "Enter Invoice Type",
      inputType: "text",
      style: "w-50",
      column: "left",
    },
  ],
  body: [
    {
      id: "seller",
      label: "Seller:",
      placeholder: "Enter Seller Information",
      inputType: "text",
      style: "w-100",
      column: "left",
    },
    {
      id: "sellerVAT",
      label: "VAT ID:",
      placeholder: "Enter VAT",
      inputType: "text",
      style: "w-100",
      column: "left",
    },
    {
      id: "sellerStreetNo",
      label: "Street and No:",
      placeholder: "Enter Street and No",
      inputType: "text",
      style: "w-100",
      column: "left",
    },
    {
      id: "sellerPostCode",
      label: "Post Code:",
      placeholder: "Enter Post Code",
      inputType: "text",
      style: "w-50 inline-block",
      column: "left",
    },
    {
      id: "sellerCity",
      label: "City:",
      placeholder: "Enter City",
      inputType: "text",
      style: "w-50 inline-block",
      column: "left",
    },
    {
      id: "sellerBankAcct",
      label: "Bank Account:",
      placeholder: "Enter Bank Account",
      inputType: "text",
      style: "w-100",
      column: "left",
    },
    {
      id: "sellerBank",
      label: "Bank:",
      placeholder: "Enter Bank",
      inputType: "text",
      style: "w-50 inline-block",
      column: "left",
    },
    {
      id: "sellerSwift",
      label: "Swift:",
      placeholder: "Enter Swift",
      inputType: "text",
      style: "w-50 inline-block",
      column: "left",
    },
    {
      id: "buyer",
      label: "Buyer:",
      placeholder: "Enter Buyer Information",
      inputType: "text",
      style: "w-100",
      column: "right",
    },
    {
      id: "buyerVAT",
      label: "Buyer VAT ID:",
      placeholder: "Enter Buyer VAT",
      inputType: "text",
      style: "w-100",
      column: "right",
    },
    {
      id: "buyerStreetNo",
      label: "Buyer Street and No:",
      placeholder: "Enter Buyer Street and No",
      inputType: "text",
      style: "w-100",
      column: "right",
    },
    {
      id: "buyerPostCode",
      label: "Post Code:",
      placeholder: "Enter Post Code",
      inputType: "text",
      style: "w-50 inline-block",
      column: "right",
    },
    {
      id: "buyerCity",
      label: "City:",
      placeholder: "Enter City",
      inputType: "text",
      style: "w-50 inline-block",
      column: "right",
    },
  ],
};

export interface InvoiceFormGroup {
  metaData: FormGroup<DocumentMetaDataFormGroup>;
  header: FormArray<FormGroup<FormInputField>>;
  headerImage: FormControl<File | null>;
  body: FormArray<FormGroup<FormInputField>>;
  invoiceTable: FormArray<FormGroup<FormTableGroup>>;
  footer: FormGroup<FooterFormGroup>;
}

export interface DocumentMetaDataFormGroup {
  id: FormControl<string>;
  status: FormControl<string | null>;
  documentName: FormControl<string | null>;
  currency: FormControl<string | null>;
}
export interface FooterFormGroup {
  netTotal: FormControl<string | null>;
  vatTotal: FormControl<string | null>;
  grossTotal: FormControl<string | null>;
}

export interface FormTableGroup {
  item: FormControl<string | null>;
  quantity: FormControl<number | null>;
  unit: FormControl<"days" | "hours" | "months" | null>;
  unitNetPrice: FormControl<number | null>;
  vatPercent: FormControl<number | null>;
  totalNet: FormControl<number | null>;
  totalGross: FormControl<number | null>;
}

export interface FormInputField {
  id: FormControl<string | null>;
  value: FormControl<string | null>;
  label: FormControl<string>;
  placeholder: FormControl<string>;
  inputType: FormControl<"date" | "text">;
  style: FormControl<"w-100" | "w-50" | "w-50 inline-block">;
  column: FormControl<"left" | "right">;
}

@Component({
  selector: "app-invoice-editor-page",
  standalone: true,
  imports: [
    CommonModule,
    EditingModeComponent,
    NgIf,
    AsyncPipe,
    PrintModeComponent,
    EditorNavbarComponent,
  ],
  templateUrl: "./invoice-editor-page.component.html",
  styleUrl: "./invoice-editor-page.component.scss",
})
export class InvoiceEditorPageComponent implements OnInit {
  public invoiceFormGroup: FormGroup<InvoiceFormGroup>;

  constructor(public invoiceEditModeState: InvoiceEditModeState) {
    this.invoiceFormGroup = new FormGroup<InvoiceFormGroup>({
      metaData: new FormGroup<DocumentMetaDataFormGroup>({
        id: new FormControl("_invoice" + crypto.randomUUID(), {
          nonNullable: true,
        }),
        status: new FormControl(null),
        documentName: new FormControl(null),
        currency: new FormControl("zł"),
      }),
      header: new FormArray<FormGroup>([]),
      headerImage: new FormControl(null),
      body: new FormArray<FormGroup>([]),
      invoiceTable: new FormArray<FormGroup>([]),
      footer: new FormGroup<FooterFormGroup>({
        netTotal: new FormControl(null),
        vatTotal: new FormControl(null),
        grossTotal: new FormControl(null),
      }),
    });
  }

  ngOnInit(): void {
    this._createInvoiceFormGroup();
  }

  private _createInvoiceFormGroup(): void {
    this._initilizeTableInputFields();

    this._initilizeFormInputFields();

    this._listenToChangesToRecalculateTotals();
  }

  private _listenToChangesToRecalculateTotals(): void {
    this.invoiceFormGroup.controls.invoiceTable.valueChanges.subscribe(() => {
      const { netTotal, vatTotal, grossTotal } = calculateOverallTotals(
        this.invoiceFormGroup.controls.invoiceTable
      );

      this.invoiceFormGroup.controls.footer.patchValue(
        { netTotal, vatTotal, grossTotal },
        { emitEvent: false }
      );
    });
  }

  private _initilizeTableInputFields(): void {
    const newRow = createTableFormGroup();

    this.invoiceFormGroup.controls.invoiceTable.push(newRow);

    newRow.valueChanges.subscribe((row: Partial<FormTableValue>) => {
      const { totalNet, totalGross } = calculateTotals(row);

      newRow.patchValue({ totalNet, totalGross }, { emitEvent: false });
    });
  }

  private _initilizeFormInputFields(): void {
    Object.keys(invoiceConfig).forEach((section) => {
      this._createInputFields(section);
    });
  }

  private _createInputFields(key: string): void {
    // Convert key string into what key for what object
    const invoiceFormKey = `${key}` as keyof InvoiceFormGroup;
    const invoiceConfigKey = `${key}` as keyof FormConfig;

    const invoiceFormGroupFormArray = this.invoiceFormGroup.get(
      invoiceFormKey
    ) as FormArray;

    (invoiceConfig[invoiceConfigKey] as InputField[]).forEach((inputField) => {
      invoiceFormGroupFormArray.push(
        new FormGroup({
          id: new FormControl({ value: inputField.id, disabled: true }),
          value: new FormControl("test"),
          label: new FormControl({ value: inputField.label, disabled: true }),
          placeholder: new FormControl(inputField.placeholder),
          inputType: new FormControl({
            value: inputField.inputType,
            disabled: true,
          }),
          style: new FormControl({ value: inputField.style, disabled: true }),
          column: new FormControl({ value: inputField.column, disabled: true }),
        })
      );
    });
  }
}
