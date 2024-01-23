import { createStore } from '@ngneat/elf';
import {
  withEntities,
  selectAllEntities,
  setEntities,
  addEntities,
  updateEntities,
  deleteEntities,
} from '@ngneat/elf-entities';
import { z } from 'zod';

export const TodoSchema = z.object({
  id: z.number(),
  title: z.string(),
  completed: z.boolean(),
  isEditing: z.boolean().optional(),
});

export type Todo = z.infer<typeof TodoSchema>;

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
