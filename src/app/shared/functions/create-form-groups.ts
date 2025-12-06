import { FormControl, FormGroup } from "@angular/forms";
import { FormTableGroup } from "../../pages/invoice-editor-page/invoice-editor-page.component";

export function createTableFormGroup(): FormGroup<FormTableGroup> {
  return new FormGroup<FormTableGroup>({
    item: new FormControl(null),
    quantity: new FormControl(null),
    unit: new FormControl("days"),
    unitNetPrice: new FormControl(null),
    vatPercent: new FormControl(null),
    totalNet: new FormControl(null),
    totalGross: new FormControl(null),
  });
}
