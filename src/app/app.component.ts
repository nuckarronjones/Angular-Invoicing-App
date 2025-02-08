import { Component } from "@angular/core";
import { NavbarComponent } from "./ui/navbar/navbar.component";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    NavbarComponent,
    RouterOutlet
  ],
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})

export class AppComponent {
  public selectedInvoice = true;
}
