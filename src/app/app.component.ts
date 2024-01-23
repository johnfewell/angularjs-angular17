import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Todo, TodoSchema, setTodos } from './repostories/todos.repository';
import { TodoService } from './services/todo.service';
import deepEqual from 'deep-equal';
import { TodoFooterComponent } from './components/todoFooter/todoFooter.component';
import { TodoHeaderComponent } from './components/todoHeader/todoHeader.component';
import { TodoItemComponent } from './components/todoItem/todoItem.component';
import { TodoListComponent } from './components/todoList/todoList.component';
import { z } from 'zod';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    TodoFooterComponent,
    TodoHeaderComponent,
    TodoItemComponent,
    TodoListComponent,
  ],
  standalone: true,
})
export class AppComponent implements OnChanges {
  @Input() state: Todo[] = [];
  @Output() notify: EventEmitter<Todo[]> = new EventEmitter<Todo[]>();
  todos$ = this.todoService.todos$;

  constructor(public todoService: TodoService) {
    this.todos$.subscribe((val) => {
      if (!deepEqual(this.state, val)) {
        this.notify.emit(val);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['state']?.currentValue !== 'stateObject' &&
      changes['state']?.currentValue !== undefined
    ) {
      const todos = changes['state'].currentValue;
      const result = z.array(TodoSchema).safeParse(todos);

      if (result.success) {
        setTodos(result.data);
      } else {
        console.error('Invalid todo schema:', result.error);
      }
    }
  }
}
