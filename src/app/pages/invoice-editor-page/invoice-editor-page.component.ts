import { Component, OnInit } from "@angular/core";
import { EditingModeComponent } from "./invoice-edit-mode/editing-mode.component";
import { InvoiceEditModeState } from "../../services/toggle-edit-mode.service";
import { EditorNavbarComponent } from "./editor-navbar/editor-navbar.component";
import { PrintModeComponent } from "./invoice-print-mode/print-mode.component";
import { CommonModule } from "@angular/common";
import { AsyncPipe } from "@angular/common";
import { NgIf } from "@angular/common";
import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { formFields } from "../../config/form-fields.model";

interface InvoiceFormGroup {
  header: FormArray<FormGroup<InputField>>;
  headerImage: FormControl;
  body: FormArray<FormGroup<InputField>>;
  footer: FormArray<FormGroup<InputField>>;
}

interface InputField {
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
    // See if we are on /invoices or /invoice/:id
    this._createInvoiceFormGroup();
  }

  private _createInvoiceFormGroup(): void {
    Object.keys(formFields).forEach((section) => {
      if (section !== "headerImage") {
        this._createInputFields(section);
      }
    });
  }

  private _createInputFields(key: string): void {
    const keyValue = `${key}` as keyof InvoiceFormGroup;

    const invoiceFormGroupFormArray = this.invoiceFormGroup.get(keyValue) as FormArray;

    formFields[keyValue].forEach(()=>{
      
    })
  }

  // Create new invoice form on /invoices route
  // If we have /invoice/:id, populate the new invoice form with data obtained from local storage (use service)

  // Create inputfield formgroup function (reusable)
}
