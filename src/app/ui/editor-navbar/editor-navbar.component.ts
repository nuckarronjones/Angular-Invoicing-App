import { Component, Output, EventEmitter } from "@angular/core";
import { MenubarModule } from "primeng/menubar";
import { MenuItem } from "primeng/api";
import { ButtonModule } from "primeng/button";
import { InvoiceEditModeService } from "../../services/invoice-edit-mode.service";
import { AsyncPipe } from "@angular/common";
import { NgIf } from "@angular/common";

@Component({
  selector: "app-editor-navbar",
  standalone: true,
  imports: [MenubarModule, ButtonModule, AsyncPipe, NgIf],
  templateUrl: "./editor-navbar.component.html",
  styleUrl: "./editor-navbar.component.scss",
})
export class EditorNavbarComponent {
  @Output() printEvent = new EventEmitter();

  items: MenuItem[] = [];

  constructor(public invoiceEditModeService: InvoiceEditModeService) {}

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
            </style>
          </head>
          <body>
            <div id="printable-area">
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
  
  
  // printInvoice(): void {
  //   const printContent = document.getElementById("printable-area");

  //   if (printContent) {
  //     // Use html2canvas to capture the div as an image with a higher scale for better resolution
  //     html2canvas(printContent, {
  //       scale: 2, // Increase scale for better resolution
  //       logging: false, // Enable logging for debugging (optional)
  //       useCORS: true, // Handle cross-origin issues with images/styles
  //       backgroundColor: null, // Makes sure the background is transparent (if you want to keep it transparent)
  //     })
  //       .then((canvas) => {
  //         // Convert the canvas to an image
  //         const imgData = canvas.toDataURL("image/png");

  //         // Open a new window for printing
  //         const printWindow = window.open("", "", "width=900,height=600");
  //         if (printWindow) {
  //           printWindow.document.write(`
  //           <html>
  //             <head>
  //               <title>Print Preview</title>
  //               <style>
  //                 *{
  //                   font-size:10px !important;
  //                 }
  //                 body {
  //                   margin: 0;
  //                   padding: 0;
  //                   display: flex;
  //                   justify-content: center;
  //                   align-items: center;
  //                   height: 100vh;
  //                   background-color: #fff; /* Ensure background color for printing */
  //                 }
  
  //                 img {
  //                   height: 1754px;
  //                   width: 1240px;
  //                   object-fit: contain;  /* Make sure the image fits well within the window */
  //                 }
  //               </style>
  //             </head>
  //             <body>
  //               <img src="${imgData}" />
  //             </body>
  //           </html>
  //         `);

  //           // Close the document and trigger the print dialog
  //           printWindow.document.close();
  //           printWindow.onload = function () {
  //             printWindow.print(); // Trigger the print dialog
  //           };
  //         }
  //       })
  //       .catch((error) => {
  //         console.error("Error capturing the div:", error);
  //       });
  //   }
  // }
  
}
