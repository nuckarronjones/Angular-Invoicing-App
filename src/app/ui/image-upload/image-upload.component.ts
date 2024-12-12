import { Component, EventEmitter, Input, Output } from "@angular/core";

import { NgIf, AsyncPipe } from "@angular/common";

import { InvoiceEditModeService } from "../../services/invoice-edit-mode.service";

@Component({
  selector: "app-image-upload",
  standalone: true,
  imports: [NgIf, AsyncPipe],
  templateUrl: "./image-upload.component.html",
  styleUrls: ["./image-upload.component.scss"],
})
export class ImageUploadComponent {
  @Output() saveImageUrl = new EventEmitter<string>();

  @Input() headerImageUrl?: string | ArrayBuffer | null = null;
  @Input({ required: true }) editMode!: boolean;

  constructor(public invoiceEditModeService: InvoiceEditModeService) {}

  public onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  public onDrop(event: DragEvent): void {
    event.preventDefault();
    const files = event.dataTransfer?.files;

    if (files && files.length > 0) {
      const file = files[0];

      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = () => {
          this.headerImageUrl = reader.result;

          if (this.headerImageUrl && typeof this.headerImageUrl === "string") {
            this.saveImageUrl.emit(this.headerImageUrl);
          } else {
            console.error("Image upload unsuccessful, url not valid");
          }
        };
        reader.readAsDataURL(file);
      } else {
        alert("Please drop an image file.");
      }
    }
  }
}
