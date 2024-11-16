import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { InvoiceEditorTableComponent } from './invoice-editor-table/invoice-editor-table.component';
import { CalendarModule } from 'primeng/calendar';


@Component({
  selector: 'app-invoice-editor',
  standalone: true,
  imports: [InputTextModule, FormsModule, InvoiceEditorTableComponent, CalendarModule],
  templateUrl: './invoice-editor.component.html',
  styleUrl: './invoice-editor.component.scss'
})

export class InvoiceEditorComponent {
  invoiceNo: string = '';
  invoiceDate: Date | undefined;
  date2: Date | undefined;
  seller: string = '';
  vatId: string = '';
  streetNo: string = '';
  postCode: string = '';
  city: string = '';
  bankAccount: string = '';
  bank: string = '';
  swift: string = '';
  buyer: string = '';
  buyerVAT: string = '';
  buyerStreetNo: string = '';
  buyerPostCode: string = '';
  buyerCity: string = '';

}
