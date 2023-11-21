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
import { Todo, setTodos } from './repostories/todos.repository';
import { TodoService } from './services/todo.service';
import deepEqual from 'deep-equal';
import { TodoFooterComponent } from './components/todoFooter/todoFooter.component';
import { TodoHeaderComponent } from './components/todoHeader/todoHeader.component';
import { TodoItemComponent } from './components/todoItem/todoItem.component';
import { TodoListComponent } from './components/todoList/todoList.component';

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
  @Output() notify: EventEmitter<any> = new EventEmitter<any>();
  todos$ = this.todoService.todos$;

  constructor(public todoService: TodoService) {
    this.todos$.subscribe((val) => {
      console.log('output state', val);
      if (!deepEqual(this.state, val)) {
        console.log('output state diffed', val);

        this.notify.emit(val);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['state']) {
      if (
        changes['state'].currentValue === 'stateObject' ||
        changes['state'].currentValue === undefined
      ) {
        return;
      }
      // this.stateLastInput = changes['state'].currentValue;
      setTodos(changes['state'].currentValue);
    }
  }
}
