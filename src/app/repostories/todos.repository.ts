import { createStore } from '@ngneat/elf';
import {
  withEntities,
  selectAllEntities,
  setEntities,
  addEntities,
  updateEntities,
  deleteEntities,
} from '@ngneat/elf-entities';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  isEditing?: boolean;
}

export const store = createStore({ name: 'todos' }, withEntities<Todo>());

export const todos$ = store.pipe(selectAllEntities());

export function setTodos(todos: Todo[]) {
  store.update(setEntities(todos));
}

export function addTodo(todo: Todo) {
  store.update(addEntities(todo));
}

export function updateTodo(id: Todo['id'], todo: Partial<Todo>) {
  store.update(updateEntities(id, todo));
}

export function deleteTodo(id: Todo['id']) {
  store.update(deleteEntities(id));
}
