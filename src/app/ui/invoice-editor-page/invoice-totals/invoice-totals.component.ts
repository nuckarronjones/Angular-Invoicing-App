import { Component, Input} from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FooterFormGroup } from "../../../pages/invoice-editor-page/invoice-editor-page.component";

@Component({
  selector: "app-invoice-totals",
  standalone: true,
  imports: [],
  templateUrl: "./invoice-totals.component.html",
  styleUrls: ["./invoice-totals.component.scss"],
})
export class InvoiceTotalsComponent  {
  @Input({required:true}) totalsForm!: FormGroup<FooterFormGroup>;
}
