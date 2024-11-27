import { Component, Input, Output, EventEmitter } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-field',
  standalone: true,
  imports: [InputTextModule, NgClass, FormsModule],
  templateUrl: './input-field.component.html',
  styleUrl: './input-field.component.scss'
})

export class InputFieldComponent {
  @Input() id!: string;
  @Input() inputType!: string;
  @Input() label!: string;
  @Input() placeholder!: string;
  @Input() class!: string;
  @Input() value!: string;
  //Used for 2 way data binding, will populate the formFields array in the parent component
  public inputValue = '';

  @Output() updatedInputValue = new EventEmitter();
}
