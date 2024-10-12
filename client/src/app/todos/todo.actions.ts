import { createAction, props } from '@ngrx/store';
import { Todo } from './todo.model';

export const loadTodos = createAction('[Todo] Load Todos');
export const loadTodosSuccess = createAction('[Todo] Load Todos Success', props<{ todos: Todo[] }>());
export const loadTodosFailure = createAction('[Todo] Load Todos Failure', props<{ error: any }>());
export const addTodo = createAction('[Todo] Add Todo', props<{ todo: Todo }>());
export const updateTodo = createAction('[Todo] Update Todo', props<{ todo: Todo }>());
export const deleteTodo = createAction('[Todo] Delete Todo', props<{ id: number }>());
