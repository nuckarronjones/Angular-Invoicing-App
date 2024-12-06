import { Component, Output, EventEmitter } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from "primeng/button";
import { PrimeIcons } from 'primeng/api';
import { InvoiceEditModeService } from '../../../services/invoice-edit-mode.service';

@Component({
  selector: 'app-editor-navbar',
  standalone: true,
  imports: [MenubarModule,ButtonModule ],
  templateUrl: './editor-navbar.component.html',
  styleUrl: './editor-navbar.component.scss'
})
export class EditorNavbarComponent {
  constructor(public invoiceEditModeService: InvoiceEditModeService){}
  @Output() printEvent = new EventEmitter();
  items: MenuItem[] = [];

  ngOnInit() {
    this.items = [
      {
        label: 'Edit',
        icon: PrimeIcons.PENCIL,
        command: () => this.invoiceEditModeService.toggleEditMode()
      },
      {
        label: 'Print',
        icon: PrimeIcons.PRINT,
        command: () => this.printInvoice()
      }
    ];
  }

  printInvoice(): void{
    // const printContents = document.getElementById(divName).innerHTML;
    //  const originalContents = document.body.innerHTML;
    //  document.body.innerHTML = printContents;
    //  window.print();
    //  document.body.innerHTML = originalContents;

    alert("printed")
  }

}
