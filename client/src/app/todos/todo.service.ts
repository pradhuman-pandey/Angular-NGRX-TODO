import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from './todo.model'; // Create a model for Todo

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = 'http://localhost:5000/todos'; // Replace with your API URL

  constructor(private http: HttpClient) {
    // console.log( this.getTodos().subscribe(
    //   (todos) => {
    //     console.log(todos, 'mxns88sts76'); // Log the API response in the console
    //   },
    //   (error) => {
    //     console.error('Error fetching todos:', error);
    //   }
    // ),'mxns88sts76')
    console.log('todos service called')
  }

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl);
  }

  addTodo(todo: Todo): Observable<Todo> {
    
    return this.http.post<Todo>(this.apiUrl, todo);
  }

  updateTodo(todo: Todo): Observable<Todo> {
    return this.http.put<Todo>(`${this.apiUrl}/${todo.id}`, todo);
  }

  deleteTodo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
