import { Component, OnInit } from "@angular/core";
import { EditingModeComponent } from "./invoice-edit-mode/editing-mode.component";
import { InvoiceEditModeState } from "../../services/toggle-edit-mode.service";
import { EditorNavbarComponent } from "./editor-navbar/editor-navbar.component";
import { PrintModeComponent } from "./invoice-print-mode/print-mode.component";
import { CommonModule } from "@angular/common";
import { AsyncPipe } from "@angular/common";
import { NgIf } from "@angular/common";
import { FormArray, FormControl, FormGroup } from "@angular/forms";

interface InputField {
  id: string;
  label: string;
  placeholder: string;
  inputType: "date" | "text";
  style: "w-100" | "w-50" | "w-50 inline-block";
  column: "left" | "right";
}

interface Formfields {
  header: ReadonlyArray<InputField>;
  headerImage: string;
  body: ReadonlyArray<InputField>;
  footer: ReadonlyArray<InputField>;
}

const invoiceConfig: Formfields = {
  headerImage: "",
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
  footer: [],
};

interface InvoiceFormGroup {
  header: FormArray<FormGroup<FormInputField>>;
  headerImage: FormControl;
  body: FormArray<FormGroup<FormInputField>>;
  footer: FormArray<FormGroup<FormInputField>>;
}

interface FormInputField {
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
      header: new FormArray<FormGroup>([]),
      headerImage: new FormControl(""),
      body: new FormArray<FormGroup>([]),
      footer: new FormArray<FormGroup>([]),
    });
  }

  ngOnInit(): void {
    this._createInvoiceFormGroup();
  }

  private _createInvoiceFormGroup(): void {
    Object.keys(invoiceConfig).forEach((section) => {
      if (section !== "headerImage") {
        this._createInputFields(section);
      }
    });
  }

  private _createInputFields(key: string): void {
    // Convert key string into what key for what object
    const invoiceFormKey = `${key}` as keyof InvoiceFormGroup;
    const invoiceConfigKey = `${key}` as keyof Formfields;

    const invoiceFormGroupFormArray = this.invoiceFormGroup.get(invoiceFormKey) as FormArray;

    (invoiceConfig[invoiceConfigKey] as InputField[]).forEach(inputField => {
      invoiceFormGroupFormArray.push(
        new FormGroup({
          id: new  FormControl({value: inputField.id, disabled: true}),
          value: new FormControl(null),
          label:new FormControl({value: inputField.label, disabled: true}),
          placeholder:new FormControl(inputField.placeholder),
          inputType: new FormControl({value: inputField.inputType, disabled: true}),
          style: new FormControl({value: inputField.style, disabled: true}),
          column: new FormControl({value: inputField.column, disabled: true}),
        })
      )
    });

  }
}
