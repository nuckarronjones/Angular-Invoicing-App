import { Injectable } from "@angular/core";
import { UserInvoicesServiceApi } from "./api/user-invoices.service";

@Injectable({
  providedIn: "root",
})

export class EditorToolbarService {
  constructor( private _userInvoicesServiceApi: UserInvoicesServiceApi){}
  
  public saveInvoice(invoiceId: string, currentInvoice: any): void {
    this._userInvoicesServiceApi.saveInvoice(invoiceId, currentInvoice);
  }

  public printInvoice(): void {
    const printContent = document.getElementById("printable-area");

    if (printContent) {
      const newPrintingTab = window.open("  ", "_blank");

      if (newPrintingTab) {
        const formattedPrintContent = this._formatPreviewContent(printContent);

        newPrintingTab.document.write(formattedPrintContent);
        newPrintingTab.document.close();
      }
    }
  }

  private _formatPreviewContent(invoiceContent: HTMLElement): string {
    return `
          <html>
          <head>
            <title>Print Preview</title>
            ${document.head.innerHTML}
            <style>
             ${this._printWindowStyling}
            </style>
          </head>
          <body>
            ${invoiceContent.outerHTML}
            <script>
              window.onload = function() {
                window.print();
              };
            </script>
          </body>
          </html>
        `;
  }

  private get _printWindowStyling(): string {
    return `
       @page{
          size: auto;
          margin: 0;
        }
        body {
          margin: 0;
          padding: 0;
        }
        #printable-area{
          zoom: .9 !important;
          overflow:hidden;
          height: auto !important;
          box-shadow: none !important;
        }
    `;
  }
}
