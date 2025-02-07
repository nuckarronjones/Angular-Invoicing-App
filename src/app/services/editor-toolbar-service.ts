import { Injectable } from '@angular/core';
import { documentData } from '../models/document-data.model';

@Injectable({
  providedIn: 'root'
})
export class EditorToolbarService {
  
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

    saveInvoice(): void{
        localStorage.setItem(documentData.id, JSON.stringify(documentData));
    }

}
