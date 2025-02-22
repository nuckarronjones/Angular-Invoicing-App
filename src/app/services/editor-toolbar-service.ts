import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class EditorToolbarService {

  public saveInvoice(invoiceId: string, currentInvoice: any): void {
    localStorage.setItem(invoiceId, JSON.stringify(currentInvoice));
  }

  
  public printInvoice(): void {
    const invoiceContent = document.getElementById("printable-area")?.innerHTML;

    if (invoiceContent) {
      const content = this._formatPreviewContent(invoiceContent);
      this._generatePrintWindow(content);
    } else {
      console.error("Printable area not found");
    }
  }

  private _formatPreviewContent(invoiceContent: string): string {

    return `
    <html>
      <head>
        <title>Print Preview</title>
        <link rel="stylesheet" href="/print-styles.css" />
        <style> </style>
      </head>
      <body>
        <div id="printable-area" style="padding:5mm;">
          ${invoiceContent}
        </div>
      </body>
    </html>
  `;
  }

  private _generatePrintWindow(content: string): void {
    const printWindow = window.open();

    if (printWindow) {
      printWindow.document.open();
      printWindow.document.write(content);
      printWindow.document.close();

      printWindow.onload = () => {
        printWindow.print();
      };
    } else {
      console.error("Failed to open print window");
    }
  }
}
