import { Injectable } from '@angular/core';
import { Observable, filter, map, take } from 'rxjs';
import {
  Todo,
  todos$,
  addTodo,
  updateTodo,
  deleteTodo,
  setTodos,
} from '../repostories/todos.repository';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todos$: Observable<Todo[]> = todos$;
  public todos = toSignal(this.todos$, { initialValue: [] as Todo[] });

  addTodo(title: string) {
    const todo: Todo = {
      title,
      completed: false,
      id: Date.now(),
    };
    addTodo(todo);
  }

  toggleTodo(id: number) {
    this.todos$
      .pipe(
        take(1),
        map((todos) => todos.find((todo) => todo.id === id))
      )
      .subscribe((todo) => {
        if (todo) {
          updateTodo(id, { ...todo, completed: !todo.completed });
        }
      });
  }

  clearCompletedTodos() {
    this.todos$
      .pipe(
        take(1),
        map((todos) => todos.filter((todo) => !todo.completed))
      )
      .subscribe((filteredTodos) => {
        setTodos(filteredTodos);
      });
  }

  markAll(completed: boolean) {
    this.todos$.pipe(take(1)).subscribe((todos) => {
      const updateTodos = todos.map((todo) => {
        todo.completed = completed;
        return todo;
      });
      setTodos(updateTodos);
    });
  }

  deleteTodo(id: number) {
    deleteTodo(id);
  }

  editTodo(todo: Todo) {}

  saveEdits(todo: Todo) {
    updateTodo(todo.id, todo);
  }
}
