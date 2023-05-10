import { Component, OnInit } from '@angular/core';
import { Modal } from 'bootstrap';

import { PostControllerService } from './domain/post-controller.service';
import { AlertControllerService } from './domain/alert-controller.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  formModal: any;

  constructor(
    private postsController: PostControllerService,
    private alertController: AlertControllerService
  ) {}

  ngOnInit(): void {
    this.postsController.getPosts();
    this.formModal = new Modal(document.getElementById('modal') as Element);
    this.alertController.setModalConfig(this.formModal);
  }
}
