import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../repostories/todos.repository';
import { TodoItemComponent } from '../todoItem/todoItem.component';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, TodoItemComponent],
  template: `
    <main class="main">
      @if(todos.length){
      <div class="toggle-all-container">
        <input
          class="toggle-all"
          id="toggle-all2"
          type="checkbox"
          (change)="toggleAll($event)"
          [checked]="!todosService.active().length"
        />
        <label class="toggle-all-label" [attr.for]="'toggle-all2'">
          Toggle All Input
        </label>
      </div>
      <ul class="todo-list">
        @for(todo of todos; track todo.id;){
        <app-todo-item
          [todo]="todo"
          [index]="$index"
          (deleteEvent)="removeTodo($event)"
        ></app-todo-item>
        }
      </ul>
      }
    </main>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListComponent {
  constructor(public todosService: TodoService) {}

  get todos(): Todo[] {
    return this.todosService.filteredTodos();
  }

  removeTodo(todo: Todo): void {
    this.todosService.deleteTodo(todo.id);
  }

  toggleAll(e: Event) {
    const input = e.target as HTMLInputElement;
    this.todosService.markAll(input.checked);
  }
}
