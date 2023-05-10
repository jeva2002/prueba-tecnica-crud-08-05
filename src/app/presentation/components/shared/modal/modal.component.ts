import { Component, OnInit } from '@angular/core';
import { AlertControllerService } from 'src/app/domain/alert-controller.service';
import { Alert } from 'src/app/entities/Alert';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  data!: Alert;

  constructor(private alertController: AlertControllerService) {}

  ngOnInit(): void {
    this.alertController.alert$.subscribe((data) => {
      if (data) this.data = data;
    });
  }
}
