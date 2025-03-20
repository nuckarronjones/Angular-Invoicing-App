import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";

@Component({
  selector: "app-invoice-totals",
  standalone: true,
  imports: [],
  templateUrl: "./invoice-totals.component.html",
  styleUrls: ["./invoice-totals.component.scss"],
})
export class InvoiceTotalsComponent implements OnChanges {
  @Input() currency: string = "";
  @Input() netTotal: string = "";
  @Input() vatTotal: string = "";
  @Input() grossTotal: string = "";

  ngOnChanges(changes: SimpleChanges): void {
    if (
      "currency" in changes ||
      "netTotal" in changes ||
      "vatTotal" in changes ||
      "grossTotal" in changes
    ) {
      console.log(changes)
      console.log("changed here in component ");
    }
  }
}
