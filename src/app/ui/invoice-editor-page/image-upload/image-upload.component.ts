import { Component, Input, OnInit } from "@angular/core";

import { NgIf, AsyncPipe } from "@angular/common";

import { InvoiceEditModeState } from "../../../services/toggle-edit-mode.service";

import { Button } from "primeng/button";
import { FormControl } from "@angular/forms";

@Component({
  selector: "app-image-upload",
  standalone: true,
  imports: [NgIf, AsyncPipe, Button],
  templateUrl: "./image-upload.component.html",
  styleUrls: ["./image-upload.component.scss"],
})
export class ImageUploadComponent implements OnInit {
  //headerImage: new FormControl(null),
  @Input({ required: true }) headerImage!: FormControl<File | null>;
  @Input({ required: true }) editMode!: boolean;

  public headerImageUrl: string | undefined;

  private _maxFileSize = 5000000; //5mb

  constructor(public invoiceEditModeState: InvoiceEditModeState) {}

  ngOnInit(): void {
    if (this.headerImage.value !== null) {
      this.headerImageUrl = URL.createObjectURL(this.headerImage.value);
    }
  }

  public removeCurrentImageUrl(): void {
    this.headerImage.setValue(null);
    this.headerImageUrl = undefined;
  }

  public onDrop(event: DragEvent): void {
    const file = event.dataTransfer?.files[0];

    if (file && this._fileIsValid(file)) {
      this.headerImage.setValue(file);

      this.headerImageUrl = URL.createObjectURL(file);
    }
  }

  public preventDefault(event: DragEvent): void {
    // Prevent browser default behavior with drag event
    event.preventDefault();
  }

  private _fileIsValid(file: File): boolean {
    if (file.size > this._maxFileSize) {
      alert("File size too large, must be less than 5mb.");
      return false;
    }

    if (!file.type.includes("image/")) {
      alert("File type must be an image.");
      return false;
    }
    
    return true;
  }
}
