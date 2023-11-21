import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-header',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `<header class="header">
    <h1>todos - Angular 17</h1>
    <input
      class="new-todo"
      placeholder="What needs to be done?"
      autofocus=""
      [formControl]="titleFormControl"
      (keyup.enter)="addTodo()"
    />
  </header>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoHeaderComponent {
  constructor(private todosService: TodoService) {}

  titleFormControl = new FormControl('');

  addTodo() {
    const title = this.titleFormControl.getRawValue()?.trim();

    if (!title) return;

    this.todosService.addTodo(title);
    this.titleFormControl.setValue('');
  }
}
