import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvoiceEditModeState {
  private editModeSubject = new BehaviorSubject<boolean>(true);
  editMode$ = this.editModeSubject.asObservable();

  constructor() { }

  public setEditMode(state: boolean): void {
    this.editModeSubject.next(state);
  }

  public toggleEditModeState(): void {
    const currentState = this.editModeSubject.getValue();
    this.editModeSubject.next(!currentState); 
  }

}
