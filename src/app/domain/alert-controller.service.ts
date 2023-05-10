import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Alert } from '../entities/Alert';

@Injectable({
  providedIn: 'root',
})
export class AlertControllerService {
  alert$ = new BehaviorSubject<null | Alert>(null);
  private modalElement!: any;

  constructor() {}

  public setAlert(data: Alert): void {
    this.alert$.next(data);
    this.modalElement.show();
  }

  public closeModal(): void {
    this.modalElement.hide();
  }

  public clearAlert(): void {
    if (!this.alert$.value) this.alert$.next(null);
  }

  public setModalConfig(modalElement: Element) {
    this.modalElement = modalElement;
  }
}
