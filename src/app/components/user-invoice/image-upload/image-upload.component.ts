import { Component, EventEmitter, Input, Output } from "@angular/core";
import { NgIf } from "@angular/common";

@Component({
  selector: "app-image-upload",
  standalone: true,
  imports: [NgIf],
  templateUrl: "./image-upload.component.html",
  styleUrls: ["./image-upload.component.scss"],
})
export class ImageUploadComponent {
  @Output() saveImageUrl = new EventEmitter<string>();
  
  @Input() headerImageUrl?:string;
  @Input({required: true}) editMode!:boolean;

  public imageUrl: string | ArrayBuffer | null = null;

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
          this.imageUrl = reader.result;

          if (this.imageUrl && typeof this.imageUrl === 'string') {
            this.saveImageUrl.emit(this.imageUrl);
          }else{
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
