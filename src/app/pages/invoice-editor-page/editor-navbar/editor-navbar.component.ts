import { Component, Output, EventEmitter } from "@angular/core";
import { MenubarModule } from "primeng/menubar";
import { MenuItem } from "primeng/api";
import { ButtonModule } from "primeng/button";
import { InvoiceEditModeState } from "../../../services/toggle-edit-mode.service";
import { AsyncPipe } from "@angular/common";

@Component({
  selector: "app-editor-navbar",
  standalone: true,
  imports: [MenubarModule, ButtonModule, AsyncPipe],
  templateUrl: "./editor-navbar.component.html",
  styleUrl: "./editor-navbar.component.scss",
})
export class EditorNavbarComponent {
  @Output() printEvent = new EventEmitter();

  items: MenuItem[] = [];

  constructor(public invoiceEditModeState: InvoiceEditModeState) {}

  printInvoice(): void {
    const printContent = document.getElementById('printable-area');
    if (printContent) {
      const styles = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'))
        .map(style => style.outerHTML)
        .join('\n');

      const content = `
        <html>
          <head>
            <title>Print Preview</title>
            ${styles}
            <style>
              @page { size: auto;  margin: 0mm; }

              *, input {
                font-size: 12px !important;
                color: black;
              }
              body {
                padding: 15px;
              }
              .input-value {
                line-height: 4px !important;
                margin-bottom: 20px;
              }
              .logo-image{
                width:150px !important;
                height:150px !important;
              }
            </style>
          </head>
          <body>
            <div id="printable-area" style="padding:5mm;">
              ${printContent.innerHTML}
            </div>
          </body>
        </html>
      `;
  
      const printWindow = window.open();
      if (printWindow) {
        printWindow.document.open();
        printWindow.document.write(content);
        printWindow.document.close();
  
        printWindow.onload = () => {
          printWindow.print();
          printWindow.close();
        };
      } else {
        console.error('Failed to open print window');
      }
    } else {
      console.error('Printable area not found');
    }
  }
  
}
