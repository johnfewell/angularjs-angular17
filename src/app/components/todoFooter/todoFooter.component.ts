import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../repostories/todos.repository';

@Component({
  selector: 'app-todo-footer',
  standalone: true,
  imports: [CommonModule],
  template: ` @if(allTodos.length){
    <footer class="footer">
      <span class="todo-count"
        ><strong>{{ activeTodos.length }}</strong>
        {{ activeTodos.length == 1 ? 'item' : 'items' }} left</span
      >
      <ul class="filters">
        <li>
          <a
            [class.selected]="todosService.filterBy() === 'all'"
            (click)="setFilter('all')"
            href="#"
            >All</a
          >
        </li>
        <li>
          <a
            [class.selected]="todosService.filterBy() === 'active'"
            (click)="setFilter('active')"
            href="#"
            >Active</a
          >
        </li>
        <li>
          <a
            [class.selected]="todosService.filterBy() === 'completed'"
            (click)="setFilter('completed')"
            href="#"
            >Completed</a
          >
        </li>
      </ul>
      <button
        *ngIf="completedTodos.length"
        type="button"
        class="clear-completed"
        (click)="clearCompleted()"
      >
        Clear Completed
      </button>
    </footer>
    }`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoFooterComponent {
  constructor(public todosService: TodoService) {}

  get completedTodos() {
    return this.todosService.completed();
  }

  get activeTodos() {
    return this.todosService.active();
  }

  get todos(): Todo[] {
    return this.todosService.filteredTodos();
  }

  get allTodos(): Todo[] {
    return this.todosService.todos();
  }

  setFilter(status: 'all' | 'completed' | 'active') {
    this.todosService.filterBy.set(status);
  }

  clearCompleted() {
    this.todosService.clearCompletedTodos();
  }
}
