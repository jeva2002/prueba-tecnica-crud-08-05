import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { PostControllerService } from 'src/app/domain/post-controller.service';

import { UsersControllerService } from 'src/app/domain/users-controller.service';
import { NewPostDTO, UpdatedPostDTO } from 'src/app/entities/Posts';
import { User } from 'src/app/entities/Users';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  form = this.builder.nonNullable.group({
    userId: ['', Validators.required],
    title: ['', Validators.required],
    body: ['', Validators.required],
  });
  bodyField = this.form.controls.body;
  titleField = this.form.controls.title;
  userIdField = this.form.controls.userId;

  users$: Observable<User[]> = new Observable();
  postId: string | null = null;

  mainTitle: string = '';

  constructor(
    private userController: UsersControllerService,
    private postsController: PostControllerService,
    private route: ActivatedRoute,
    private builder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.users$ = this.userController.getAllUsers();
    this.route.paramMap.subscribe((params) => {
      this.postId = params.get('postId');
      this.mainTitle = this.postId
        ? 'Modifica este post'
        : 'Crea un nuevo post';
      if (this.postId) this.setPostValues();
    });
  }

  setPostValues(): void {
    const targetPost = this.postsController.getPostById(
      parseInt(this.postId ?? '')
    );
    if (targetPost) {
      const { id, ...formValues } = targetPost;
      this.form.patchValue({
        ...formValues,
        userId: formValues.userId.toString(),
      });
    }
  }

  submit(): void {
    if (this.form.valid) {
      if (this.postId) {
        this.postsController.updatePost({
          id: parseInt(this.postId),
          ...this.form.value,
        } as unknown as UpdatedPostDTO);
      } else {
        this.postsController.addPost({
          ...this.form.value,
        } as unknown as NewPostDTO);
        this.form.reset();
      }
    }
  }
}
