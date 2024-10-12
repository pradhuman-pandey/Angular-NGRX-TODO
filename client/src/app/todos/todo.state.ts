 
import {Todo} from './todo.model';

export interface TodosState {
    todos: Todo[];
}


export const initialTodosState: TodosState = {
    todos: []
}