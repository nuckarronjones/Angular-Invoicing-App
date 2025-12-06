import { FormControl, FormGroup, Validators } from "@angular/forms";
import { FormTableGroup } from "../../pages/invoice-editor-page/invoice-editor-page.component";

export function createTableFormGroup(): FormGroup<FormTableGroup> {
  return new FormGroup<FormTableGroup>({
    item: new FormControl(null, [Validators.required]),
    quantity: new FormControl(null, [Validators.required]),
    unit: new FormControl("days"),
    unitNetPrice: new FormControl(null, [Validators.required]),
    vatPercent: new FormControl(null),
    totalNet: new FormControl(0),
    totalGross: new FormControl(0),
  });
}
