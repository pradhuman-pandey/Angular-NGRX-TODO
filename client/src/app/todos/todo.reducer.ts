import { createReducer, on } from '@ngrx/store';
import { Todo } from './todo.model';
import * as TodoActions from './todo.actions';

export interface State {
  readonly todos: Todo[];
  readonly error: any;

}

export const initialState: State = {
  todos: [],
  error: null,
};

export const todoReducer = createReducer(
  initialState,
  on(TodoActions.loadTodosSuccess, (state, { todos }) => ({ ...state, todos })),
  on(TodoActions.loadTodosFailure, (state, { error }) => ({ ...state, error })),
  on(TodoActions.addTodo, (state, { todo }) => ({ ...state, todos: [...state.todos, todo] })),
  on(TodoActions.updateTodo, (state, { todo }) => ({
    ...state,
    todos: state.todos.map(t => (t.id === todo.id ? todo : t)),
  })),
  on(TodoActions.deleteTodo, (state, { id }) => ({
    ...state,
    todos: state.todos.filter(t => t.id !== id),
  }))
);
