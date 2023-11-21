import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  computed,
  signal,
} from '@angular/core';
import { Todo, setTodos, todos$ } from './repostories/todos.repository';
import { TodoService } from './services/todo.service';
import deepEqual from 'deep-equal';
import { filter, map, take } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [FormsModule, CommonModule],
  standalone: true,
})
export class AppComponent implements OnChanges {
  @Input() state?: Todo[];
  @Output() notify: EventEmitter<any> = new EventEmitter<any>();
  todos = this.todoService.todos;
  allChecked = false;
  remainingCount = 0;
  completedCount = 0;
  messageMapping: { [k: string]: string } = {
    '=0': 'items left',
    '=1': 'item left',
    other: 'items left',
  };

  filterBy = signal('all');

  filteredTodos = computed(() => {
    if (this.filterBy() === 'completed') {
      return this.todos().filter((todo) => todo.completed);
    } else if (this.filterBy() === 'incomplete') {
      return this.todos().filter((todo) => !todo.completed);
    }
    return this.todos();
  });

  constructor(public todoService: TodoService) {
    todos$.subscribe((val) => {
      this.completedCount = val.filter((todo) => todo.completed).length;
      this.remainingCount = val.length - this.completedCount;
      console.log(
        'completeed',
        this.completedCount,
        'remaining',
        this.remainingCount
      );
      if (!deepEqual(this.state, val)) {
        this.notify.emit(val);
      }
    });
  }

  setFilter(status: 'all' | 'completed' | 'incomplete') {
    this.filterBy.set(status);
  }

  editTodo(todo: Todo) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['state']) {
      if (
        changes['state'].currentValue === 'stateObject' ||
        changes['state'].currentValue === undefined
      ) {
        return;
      }
      setTodos(changes['state'].currentValue);
    }
  }
}
