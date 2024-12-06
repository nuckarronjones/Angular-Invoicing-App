import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvoiceEditModeService {
  private editModeSubject = new BehaviorSubject<boolean>(true);
  editMode$ = this.editModeSubject.asObservable();

  constructor() { }

  setEditMode(state: boolean): void {
    this.editModeSubject.next(state);
  }

  toggleEditMode(): void {
    const currentState = this.editModeSubject.getValue();
    this.editModeSubject.next(!currentState); 
  }

}
