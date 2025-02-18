import { Component, OnInit } from "@angular/core";
import { UserInvoicesService } from "../../services/api/user-invoices.service";
import { ProgressSpinnerModule } from "primeng/progressspinner";
import { TableModule } from "primeng/table";
import { ButtonModule } from "primeng/button";
import { MenuModule } from "primeng/menu";
import { FormsModule } from "@angular/forms";
import { NgIf } from "@angular/common";
import { Router } from "@angular/router";
import { InvoiceEditModeState } from "../../services/toggle-edit-mode.service";

@Component({
  selector: "app-user-invoices-page",
  standalone: true,
  imports: [
    ProgressSpinnerModule,
    NgIf,
    TableModule,
    ButtonModule,
    MenuModule,
    FormsModule,
  ],
  templateUrl: "./user-invoices-page.component.html",
  styleUrl: "./user-invoices-page.component.scss",
})
export class UserInvoicesPageComponent implements OnInit {
  constructor(
    public userInvoicesService: UserInvoicesService,
    private _router: Router,
    private _invoiceEditModeState: InvoiceEditModeState
  ) {}

  public isLoading: boolean = true;
  public allUserInvoices: any[] | null = null;
  public actionItems: any[] = [];

  private _dropdownSelectedInvoice: string = "";

  //When the user clicks the cog, store away the id for that invoice in the event the user wants to navigate to it later.
  public setSelectedInvoice(invoiceId: string): void {
    this._dropdownSelectedInvoice = invoiceId;
  }

  ngOnInit(): void {
    this.userInvoicesService.setUserInvoices();

    this.userInvoicesService.userInvoices$.subscribe((value) => {
      if (value !== null) {
        this.isLoading = false;
        this.allUserInvoices = value;
      }
    });

    this.actionItems = [
      {
        label: "Edit",
        icon: "pi pi-pencil",
        command: () => {
          this._invoiceEditModeState.setEditMode(true);
          this._router.navigate([`/invoice/${this._dropdownSelectedInvoice}`]);
        },
      },
      {
        label: "View",
        icon: "pi pi-search",
        command: () => {
          this._invoiceEditModeState.setEditMode(false);
          this._router.navigate([`/invoice/${this._dropdownSelectedInvoice}`]);
        },
      },
    ];
  }
}
