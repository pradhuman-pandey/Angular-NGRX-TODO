import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as TodoActions from '../todo.actions';
import { Observable, tap } from 'rxjs';
import { Todo } from '../todo.model';



import { selectIsLoading, selectLoaderState } from '../loader.selectors'; // Import loader selector
import { selectAllTodos } from '../todo.selectors';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todos$: Observable<Todo[]> | undefined;
  isLoading$: Observable<boolean> | any;
  myForm!: FormGroup;
  value!: boolean;
  loading!: boolean;
  title!: string;

  constructor(private store: Store, private fb: FormBuilder) {
    this.myForm = this.fb.group({
      inputField: ['', Validators.required]
    })
  }

  ngOnInit(): void {
     // Dispatch the action to load todos
  this.store.dispatch(TodoActions.loadTodos());

  // Select todos from the store
  this.todos$ = this.store.select(selectAllTodos);

  // Track the loader state using the correct selector
  this.isLoading$ = this.store.select(selectIsLoading);
  
   this.isLoading$.subscribe((loading: boolean) => {
    this.loading = loading;
  });
 
  }

  ngOnDestroy(): void {
    this.isLoading$.unsubscribe();
  }

  generateId() {
    return Math.floor(Math.random() * 1000);
  }

  onSubmit() {
    if (this.myForm.valid) {
      const newTodo = {

        id: this.generateId(),

        completed: false,

        title: this.myForm.value.inputField ?? ""

      };
      this.title = this.myForm.value.inputField;

      const payload = { 
        todo: newTodo
      }

      console.log('Form Submitted!', this.myForm.value);
      this.store.dispatch(TodoActions.addTodo(payload))
    } else {
      console.log('Form is invalid');
    }
  }

  test(){
    console.log("check this is priyanshi")
  }

  Delete(id_:number){
    const payload = {
      id:id_
    }
    this.store.dispatch(TodoActions.deleteTodo(payload))
  }

  onEdit(todo: Todo): void {
    this.title = todo.title; // Set the selected todo
    this.myForm.patchValue({ inputField: todo.title }); // Patch the form with the todo's title
  }

}

