import { Component, OnInit } from "@angular/core";
import { UserInvoicesService } from "../../services/api/user-invoices.service";
import { ProgressSpinnerModule } from "primeng/progressspinner";
import { TableModule } from "primeng/table";
import { ButtonModule } from "primeng/button";
import { MenuModule } from "primeng/menu";
import { FormsModule } from "@angular/forms";
import { NgIf } from "@angular/common";

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
  constructor(public userInvoicesService: UserInvoicesService) {}

  public isLoading: boolean = true;
  public allUserInvoices: any[] | null = null;
  public actionItems: any[] = [];

  selectedCity: any;

  ngOnInit(): void {
    this.userInvoicesService.getUserInvoices();

    this.userInvoicesService.userInvoices$.subscribe((value) => {
      if (value !== null) {
        this.isLoading = false;
        this.allUserInvoices = value;
      }
    });

    this.actionItems = [
      { label: "Edit", icon: "pi pi-pencil" },
      { label: "View", icon: "pi pi-search" },
    ];
  }
}
