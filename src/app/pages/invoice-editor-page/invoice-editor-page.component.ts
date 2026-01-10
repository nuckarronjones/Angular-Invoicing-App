import { Component, OnInit } from "@angular/core";
import { EditingModeComponent } from "./invoice-edit-mode/editing-mode.component";
import { InvoiceEditModeState } from "../../services/toggle-edit-mode.service";
import { EditorNavbarComponent } from "./editor-navbar/editor-navbar.component";
import { PrintModeComponent } from "./invoice-print-mode/print-mode.component";
import { CommonModule } from "@angular/common";
import { AsyncPipe } from "@angular/common";
import { NgIf } from "@angular/common";
import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import {
  InvoiceDataOutput,
  UserInvoicesServiceApi,
} from "../../services/api/user-invoices.service";
import { createTableFormRowGroup } from "../../shared/create-table-form-group";

interface InputField {
  id: string;
  label: string;
  placeholder: string;
  inputType: "date" | "text";
  style: "w-100" | "w-50" | "w-50 inline-block";
  column: "left" | "right";
}

interface OverallTotals {
  netTotal: string;
  vatTotal: string;
  grossTotal: string;
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
  public invoiceFormGroup!: FormGroup<InvoiceFormGroup>;

  private _currentInvoice: InvoiceDataOutput | null = null;

  constructor(
    public invoiceEditModeState: InvoiceEditModeState,
    private _activatedRoute: ActivatedRoute,
    private _userInvoicesServiceApi: UserInvoicesServiceApi
  ) {}

  ngOnInit(): void {
    this._activatedRoute.queryParamMap.subscribe((params) => {
      const currentInvoiceId = params.get("id");

      this._currentInvoice = currentInvoiceId
        ? this._userInvoicesServiceApi.getInvoiceById(currentInvoiceId)
        : null;

      this._initilizeInvoice();

      this._listenToChangesToRecalculateTotals();

      this._initilizeFormInputFields();
    });
  }

  private _initilizeInvoice(): void {
    const invoiceId = this._currentInvoice
      ? this._currentInvoice.metaData.id
      : "_invoice" + crypto.randomUUID();

    this.invoiceFormGroup = new FormGroup<InvoiceFormGroup>({
      metaData: new FormGroup<DocumentMetaDataFormGroup>({
        id: new FormControl(invoiceId, {
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

  private _calculateOverallTotals(
    invoiceTable: FormArray<FormGroup<FormTableGroup>>
  ): OverallTotals {
    let totalOverallNet = 0;
    let totalOverallVat = 0;
    let totalOverallGross = 0;

    invoiceTable.controls.forEach((row) => {
      totalOverallNet += row.controls.totalNet.value ?? 0;

      totalOverallVat +=
        ((row.controls.vatPercent.value ?? 0) / 100) *
        (row.controls.totalNet.value ?? 0);
    });

    totalOverallGross = totalOverallNet + totalOverallVat;

    return {
      netTotal: totalOverallNet.toFixed(2),
      vatTotal: totalOverallVat.toFixed(2),
      grossTotal: totalOverallGross.toFixed(2),
    };
  }

  private _listenToChangesToRecalculateTotals(): void {
    this.invoiceFormGroup.controls.invoiceTable.valueChanges.subscribe(() => {
      const { netTotal, vatTotal, grossTotal } = this._calculateOverallTotals(
        this.invoiceFormGroup.controls.invoiceTable
      );

      this.invoiceFormGroup.controls.footer.patchValue(
        { netTotal, vatTotal, grossTotal },
        { emitEvent: false }
      );
    });
  }

  private _initilizeFormInputFields(): void {
    Object.keys(invoiceConfig).forEach((section) => {
      this._createInputFields(section);
    });

    this._initilizeTableInputFields();
  }

  private _initilizeTableInputFields(): void {
    if (this._currentInvoice) {
      this._currentInvoice.invoiceTable.forEach((row) => {
        this.invoiceFormGroup.controls.invoiceTable.push(
          createTableFormRowGroup(row)
        );
      });
    } else {
      this.invoiceFormGroup.controls.invoiceTable.push(
        createTableFormRowGroup()
      );
    }
  }

  private _createInputFields(key: string): void {
    // Convert key string into what key for what object
    const invoiceFormKey = `${key}` as keyof InvoiceFormGroup;
    const invoiceSectionKey = `${key}` as keyof FormConfig;

    const invoiceFormGroupFormArray = this.invoiceFormGroup.get(
      invoiceFormKey
    ) as FormArray;

    const currentInvoiceSection =
      this._currentInvoice?.[invoiceSectionKey] ?? [];

    const valueMap = new Map(
      currentInvoiceSection.map((field) => [field.id, field.value])
    );

    (invoiceConfig[invoiceSectionKey] as InputField[]).forEach((inputField) => {
      invoiceFormGroupFormArray.push(
        new FormGroup({
          id: new FormControl({ value: inputField.id, disabled: true }),
          value: new FormControl(valueMap.get(inputField.id) ?? ""),
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
