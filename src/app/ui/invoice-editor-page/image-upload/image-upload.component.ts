import { Component, EventEmitter, Input, Output } from "@angular/core";

import { NgIf, AsyncPipe } from "@angular/common";

import { InvoiceEditModeState } from "../../../services/toggle-edit-mode.service";

import { Button } from "primeng/button";

@Component({
  selector: "app-image-upload",
  standalone: true,
  imports: [NgIf, AsyncPipe, Button],
  templateUrl: "./image-upload.component.html",
  styleUrls: ["./image-upload.component.scss"],
})
export class ImageUploadComponent {
  @Input() headerImageUrl?: string | ArrayBuffer | null = null;
  @Input({ required: true }) editMode!: boolean;

  @Output() saveImageUrl = new EventEmitter<string>();

  constructor(public invoiceEditModeState: InvoiceEditModeState) {}

  public onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  public removeCurrentImageUrl():void{
    this.headerImageUrl = null;
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
            console.log("saved image url");
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
