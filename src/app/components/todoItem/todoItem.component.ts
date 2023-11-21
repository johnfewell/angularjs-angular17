import { CommonModule } from '@angular/common';
import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Todo } from '../../repostories/todos.repository';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `<li
    [ngClass]="{ completed: todo.completed, editing: isEditing }"
    style="border-bottom: 1px solid #ededed;"
  >
    <div class="view">
      <input
        class="toggle"
        type="checkbox"
        (click)="toggleTodo()"
        [checked]="todo.completed"
      />
      <label (dblclick)="startEdit()">{{ todo.title }}</label>
      <button class="destroy" (click)="removeTodo()"></button>
    </div>
    <div *ngIf="isEditing" class="input-container">
      <input
        #todoInputRef
        class="edit"
        id="edit-todo-input"
        (focus)="handleFocus($event)"
        (blur)="handleBlur($event)"
        (keyup.enter)="updateTodo()"
        [formControl]="titleFormControl"
      />
      <label class="visually-hidden" htmlFor="edit-todo-input">
        Edit Todo Input
      </label>
    </div>
  </li>`,
  styles: ['li {border-bottom: 1px solid #ededed;}'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoItemComponent implements AfterViewChecked {
  private _todo: Todo = {
    id: 0,
    title: '',
    completed: false,
  };

  @Input()
  set todo(value: Todo) {
    this._todo = value;
    console.log('todo input', value);
    // Perform your action or computation here
  }

  get todo(): Todo {
    return this._todo;
  }

  @Input() index: number = 0;

  @Output() deleteEvent = new EventEmitter<Todo>();

  @ViewChild('todoInputRef') inputRef: ElementRef | undefined;

  constructor(private todoSerivce: TodoService) {}

  titleFormControl = new FormControl('');

  isEditing = false;

  toggleTodo(): void {
    this.todoSerivce.toggleTodo(this.todo.id);
    this.todo.completed = !this.todo.completed;
  }

  removeTodo(): void {
    this.deleteEvent.emit(this.todo);
  }

  startEdit() {
    this.isEditing = true;
  }

  handleBlur(e: Event) {
    this.isEditing = false;
  }

  handleFocus(e: Event) {
    this.titleFormControl.setValue(this.todo.title);
  }

  updateTodo() {
    const title = this.titleFormControl.getRawValue()?.trimEnd();
    if (!title) {
      this.deleteEvent.emit(this.todo);
    } else {
      const payload = {
        ...this.todo,
        title,
      };
      this.todoSerivce.saveEdits(payload);
    }

    this.isEditing = false;
  }

  ngAfterViewChecked(): void {
    if (this.isEditing) this.inputRef?.nativeElement.focus();
  }
}
