import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { UserInvoicesServiceApi } from "../../services/api/user-invoices.service";
import { ProgressSpinnerModule } from "primeng/progressspinner";
import { TableModule } from "primeng/table";
import { ButtonModule } from "primeng/button";
import { MenuModule } from "primeng/menu";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgIf } from "@angular/common";
import { Router } from "@angular/router";
import { InvoiceEditModeState } from "../../services/toggle-edit-mode.service";
import { DropdownModule } from "primeng/dropdown";

export interface InvoiceDetails {
  invoiceId: string;
  invoiceNo: string;
  invoiceDate: string;
  invoiceDueDate: string;
  grossTotal: string;
  buyer: string;
  status: string;
  currency: string;
}

export enum InvoiceStatus {
  Issued = "Issued",
  Paid = "Paid",
  Unpaid = "Unpaid",
  Overdue = "Overdue",
  Canceled = "Canceled",
  PartiallyPaid = "Partially Paid",
  Pending = "Pending",
  Refunded = "Refunded",
  Approved = "Approved",
}

interface ActionItems {
  label: string;
  icon: string;
  styleClass: string;
  command: () => void;
}

interface SatusItems {
  label: InvoiceStatus;
  dataCy: string;
  command: (invoiceId: string) => void;
}

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
    DropdownModule,
    ReactiveFormsModule,
  ],
  templateUrl: "./user-invoices-page.component.html",
  styleUrl: "./user-invoices-page.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserInvoicesPageComponent implements OnInit {
  constructor(
    private _userInvoicesServiceApi: UserInvoicesServiceApi,
    private _router: Router,
    private _invoiceEditModeState: InvoiceEditModeState,
  ) {}

  public isLoading: boolean = true;
  public userInvoicesDetails: InvoiceDetails[] | null = null;
  public actionItems: ActionItems[] = [];
  public statusItems: SatusItems[] = [];

  private _dropdownSelectedInvoice: string = "";

  //When the user clicks the cog, store away the id for that invoice in the event the user wants to navigate to it later.
  public setSelectedInvoice(invoiceId: string): void {
    this._dropdownSelectedInvoice = invoiceId;
  }

  public createNewInvoice(): void {
    this._invoiceEditModeState.setEditMode(true);

    this._router.navigate([`/invoice/new`]);
  }

  ngOnInit(): void {
    this.userInvoicesDetails = this._userInvoicesServiceApi.getInvoiceDetails();

    this.actionItems = [
      {
        label: "Edit",
        icon: "pi pi-pencil",
        styleClass: "cy-action-edit",
        command: () => {
          this._invoiceEditModeState.setEditMode(true);
          this._setInvoiceURL();
        },
      },
      {
        label: "View",
        icon: "pi pi-search",
        styleClass: "cy-action-view",
        command: () => {
          this._invoiceEditModeState.setEditMode(false);
          this._setInvoiceURL();
        },
      },
      {
        label: "Delete",
        icon: "pi pi-trash",
        styleClass: "cy-action-delete",
        command: () => {
          this._userInvoicesServiceApi.deleteInvoice(
            this._dropdownSelectedInvoice,
          );
          //Our user invoice data needs to be refreshed, as the user has just deleted and invoice
          this._refreshComponent();
        },
      },
    ];

    this.statusItems = [
      {
        label: InvoiceStatus.Issued,
        dataCy: "status-option-issued",
        command: (invoiceId: string) => {
          this._updateInvoiceStatus(invoiceId, InvoiceStatus.Issued);
        },
      },
      {
        label: InvoiceStatus.Paid,
        dataCy: "status-option-paid",
        command: (invoiceId: string) => {
          this._updateInvoiceStatus(invoiceId, InvoiceStatus.Paid);
        },
      },
      {
        label: InvoiceStatus.Unpaid,
        dataCy: "status-option-unpaid",
        command: (invoiceId: string) => {
          this._updateInvoiceStatus(invoiceId, InvoiceStatus.Unpaid);
        },
      },
      {
        label: InvoiceStatus.Overdue,
        dataCy: "status-option-overdue",
        command: (invoiceId: string) => {
          this._updateInvoiceStatus(invoiceId, InvoiceStatus.Overdue);
        },
      },
      {
        label: InvoiceStatus.Canceled,
        dataCy: "status-option-canceled",
        command: (invoiceId: string) => {
          this._updateInvoiceStatus(invoiceId, InvoiceStatus.Canceled);
        },
      },
      {
        label: InvoiceStatus.PartiallyPaid,
        dataCy: "status-option-partially-paid",
        command: (invoiceId: string) => {
          this._updateInvoiceStatus(invoiceId, InvoiceStatus.PartiallyPaid);
        },
      },
      {
        label: InvoiceStatus.Pending,
        dataCy: "status-option-pending",
        command: (invoiceId: string) => {
          this._updateInvoiceStatus(invoiceId, InvoiceStatus.Pending);
        },
      },
      {
        label: InvoiceStatus.Refunded,
        dataCy: "status-option-refunded",
        command: (invoiceId: string) => {
          this._updateInvoiceStatus(invoiceId, InvoiceStatus.Refunded);
        },
      },
      {
        label: InvoiceStatus.Approved,
        dataCy: "status-option-approved",
        command: (invoiceId: string) => {
          this._updateInvoiceStatus(invoiceId, InvoiceStatus.Approved);
        },
      },
    ];
  }

  private _setInvoiceURL(): void {
    this._router.navigate(["/invoice"], {
      queryParams: { id: this._dropdownSelectedInvoice },
    });
  }

  private _refreshComponent(): void {
    this.isLoading = true;
    this.ngOnInit();
  }

  private _updateInvoiceStatus(
    invoiceId: string,
    newStatus: InvoiceStatus,
  ): void {
    this._userInvoicesServiceApi.updateInvoiceStatus(invoiceId, newStatus);
  }
}
