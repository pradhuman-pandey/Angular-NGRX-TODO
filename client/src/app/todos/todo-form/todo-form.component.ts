import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as TodoActions from '../todo.actions';
import { Todo } from '../todo.model';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html'
})
export class TodoFormComponent {
  title: string | undefined;

  constructor(private store: Store) {}

  addTodo() {
    const newTodo: Todo = { id: Math.random(), title: this.title ?? "" }; // Replace with proper ID generation
    this.store.dispatch(TodoActions.addTodo({ todo: newTodo }));
    this.title = ''; // Clear the input
  }
}
