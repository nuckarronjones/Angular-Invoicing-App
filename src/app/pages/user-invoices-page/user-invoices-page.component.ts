import { Component, OnInit } from "@angular/core";
import { UserInvoicesServiceApi} from "../../services/api/user-invoices.service";
import { ProgressSpinnerModule } from "primeng/progressspinner";
import { TableModule } from "primeng/table";
import { ButtonModule } from "primeng/button";
import { MenuModule } from "primeng/menu";
import { FormsModule } from "@angular/forms";
import { NgIf } from "@angular/common";
import { Router } from "@angular/router";
import { InvoiceEditModeState } from "../../services/toggle-edit-mode.service";
import { DocumentData } from "../../enums/invoice-document.enum";

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
    private _userInvoicesServiceApi: UserInvoicesServiceApi,
    private _router: Router,
    private _invoiceEditModeState: InvoiceEditModeState
  ) {}

  public isLoading: boolean = true;
  public allUserInvoices: DocumentData[] | null = null;
  public actionItems: any[] = [];

  private _dropdownSelectedInvoice: string = "";

  //When the user clicks the cog, store away the id for that invoice in the event the user wants to navigate to it later.
  public setSelectedInvoice(invoiceId: string): void {
    this._dropdownSelectedInvoice = invoiceId;
  }

  public createNewInvoice(): void {
    this._invoiceEditModeState.setEditMode(true);

    this._router.navigate([`/invoices`]);
  }

  ngOnInit(): void {
    this._userInvoicesServiceApi.setAllUserInvoices();

    //Get a "list" of all saved user invoices
    this._userInvoicesServiceApi.allUserInvoices$.subscribe((userInvoices) => {
      if (userInvoices !== null) {
        this.isLoading = false;
        this.allUserInvoices = userInvoices;
      }
    });

    this.actionItems = [
      {
        label: "Edit",
        icon: "pi pi-pencil",
        command: () => {
          this._invoiceEditModeState.setEditMode(true);
          this._userInvoicesServiceApi.setCurrentInvoiceById(this._dropdownSelectedInvoice);
          this._router.navigate([`/invoice/${this._dropdownSelectedInvoice}`]);
        },
      },
      {
        label: "View",
        icon: "pi pi-search",
        command: () => {
          this._invoiceEditModeState.setEditMode(false);
          this._userInvoicesServiceApi.setCurrentInvoiceById(this._dropdownSelectedInvoice);
          this._router.navigate([`/invoice/${this._dropdownSelectedInvoice}`]);
        },
      },
      {
        label: "Delete",
        icon: "pi pi-trash",
        command: () => {
          localStorage.removeItem(this._dropdownSelectedInvoice);
        },
      },
    ];
  }
}
