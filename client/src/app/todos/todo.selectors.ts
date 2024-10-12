 
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TodosState } from './todo.state';

export const selectTodosState = createFeatureSelector<TodosState>('todos');

export const selectAllTodos = createSelector(
  selectTodosState,
  (state: TodosState) => state.todos
);
