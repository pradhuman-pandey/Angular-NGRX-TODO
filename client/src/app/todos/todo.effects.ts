// import { Injectable } from '@angular/core';
// import { Actions, createEffect, ofType } from '@ngrx/effects';
// import { TodoService } from './todo.service';
// import * as TodoActions from './todo.actions';
import * as LoaderActions from './loader.actions';
// import {
//   catchError,
//   finalize,
//   map,
//   mergeMap,
//   switchMap,
//   tap,
// } from 'rxjs/operators';

// import { ToastrService } from 'ngx-toastr';
// import { of } from 'rxjs';
// import { Store } from '@ngrx/store';

// @Injectable()
// export class TodoEffects {
//   constructor(
//     private actions$: Actions,
//     private todoService: TodoService,
//     private toastr: ToastrService,
//     private store: Store
//   ) {}

//   loadTodos$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(TodoActions.loadTodos),  // Trigger on loadTodos action
//       mergeMap(() => 
//         this.todoService.getTodos().pipe(  // Using pipe inside mergeMap
//           map(todos => TodoActions.loadTodosSuccess({ todos })),  // Map response to success action
//           catchError(error => of(TodoActions.loadTodosFailure({ error }))) // Catch error and map to failure action
//         )
//       )
//     )
//   );

//   // loadTodos$ = createEffect(() =>
//   //   this.actions$.pipe(
//   //     ofType(TodoActions.loadTodos),
//   //     mergeMap(() =>
//   //       this.todoService.getTodos().pipe(
//   //         map((todos) => TodoActions.loadTodosSuccess({ todos })),
//   //         catchError((error) => {
//   //           console.error(error); // Log the error for debugging
//   //           return of(TodoActions.loadTodosFailure({ error }));
//   //         })
//   //       )
//   //     )
//   //   )
//   // );

//   // loadTodos$ = createEffect(() =>
//   //   this.actions$?.pipe(
//   //     ofType(TodoActions.loadTodos),
//   //     tap(() => this.store.dispatch(LoaderActions.showLoader())), // Dispatch showLoader action
//   //     mergeMap(() =>
//   //       this.todoService.getTodos().pipe(
//   //         map(todos => TodoActions.loadTodosSuccess({ todos })),
//   //         catchError(error => of(TodoActions.loadTodosFailure({ error }))),
//   //         finalize(() => this.store.dispatch(LoaderActions.hideLoader())) // Dispatch hideLoader action
//   //       )
//   //     )
//   //   )
//   // );

//   //   loadTodos$ = createEffect(() =>
//   //     this.actions$?.pipe(
//   //         ofType(TodoActions.loadTodos),
//   //         tap(() => this?.store?.dispatch(LoaderActions?.showLoader())), // Show loader
//   //         mergeMap(() =>
//   //             this.todoService?.getTodos()?.pipe(
//   //                 map(todos => {
//   //                     this.store.dispatch(LoaderActions.hideLoader()); // Hide loader
//   //                     return TodoActions.loadTodosSuccess({ todos });
//   //                 }),
//   //                 catchError(error => {
//   //                     this.store.dispatch(LoaderActions.hideLoader()); // Hide loader
//   //                     return of(TodoActions.loadTodosFailure({ error }));
//   //                 })
//   //             )
//   //         )
//   //     )
//   // );

//   // Similar for Add, Update, and Delete Todos with Loader and Toaster

//   // addTodo$ = createEffect(() =>
//   //   this.actions$.pipe(
//   //     ofType(TodoActions.addTodo),
//   //     mergeMap((action) =>
//   //       this.todoService.addTodo(action.todo).pipe(
//   //         map((todo) => TodoActions.loadTodos()), // reload todos after adding
//   //         catchError(async (error) => TodoActions.loadTodosFailure({ error }))
//   //       )
//   //     )
//   //   )
//   // );

//   // updateTodo$ = createEffect(() =>
//   //   this.actions$.pipe(
//   //     ofType(TodoActions.updateTodo),
//   //     mergeMap((action) =>
//   //       this.todoService.updateTodo(action.todo).pipe(
//   //         map((todo) => TodoActions.loadTodos()), // reload todos after updating
//   //         catchError(async (error) => TodoActions.loadTodosFailure({ error }))
//   //       )
//   //     )
//   //   )
//   // );

//   // deleteTodo$ = createEffect(() =>
//   //   this.actions$.pipe(
//   //     ofType(TodoActions.deleteTodo),
//   //     mergeMap((action) =>
//   //       this.todoService.deleteTodo(action.id).pipe(
//   //         map(() => TodoActions.loadTodos()), // reload todos after deletion
//   //         catchError(async (error) => TodoActions.loadTodosFailure({ error }))
//   //       )
//   //     )
//   //   )
//   // );
// }


















import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TodoService } from './todo.service';
import * as TodoActions from './todo.actions';
import {
  catchError,
  map,
  mergeMap,
  tap,
} from 'rxjs/operators';
import { of, timer } from 'rxjs';
import { Store } from '@ngrx/store';

@Injectable()
export class TodoEffects {
  loadTodos$; // Declare the property without initialization
  addTodo$;
  updateTodo$;
  deleteTodo$;
  constructor(private actions$: Actions, private todoService: TodoService, private store: Store) {
    // Initialize it in the constructor
    // this.loadTodos$ = createEffect(() =>
    //   this.actions$.pipe(
    //     ofType(TodoActions.loadTodos),
    //     mergeMap(() =>
    //       this.todoService.getTodos().pipe(
    //         map(todos => TodoActions.loadTodosSuccess({ todos })),
    //         catchError(error => of(TodoActions.loadTodosFailure({ error })))
    //       )
    //     )
    //   )
    // );


    this.loadTodos$ = createEffect(() =>
      this.actions$.pipe(
        ofType(TodoActions.loadTodos),
        tap(() => this.store.dispatch(LoaderActions.showLoader())), // Show loader when action is dispatched
        mergeMap(() =>
          this.todoService.getTodos().pipe(
            map((todos) => {
              // Delay hiding the loader for 10 seconds (10,000 milliseconds)
          timer(1000).subscribe(() => {
            this.store.dispatch(LoaderActions.hideLoader()); // Hide loader after 10 seconds
          });

              return TodoActions.loadTodosSuccess({ todos });
            }),
            catchError((error) => {
              this.store.dispatch(LoaderActions.hideLoader()); // Hide loader when an error occurs
              return of(TodoActions.loadTodosFailure({ error }));
            })
          )
        )
      )
    );
    



  this.addTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.addTodo),
      tap(()=>this.store.dispatch(LoaderActions.showLoader())),
      mergeMap((action) =>
        this.todoService.addTodo(action.todo).pipe(
          map((todo) => {
                // Delay hiding the loader for 10 seconds (10,000 milliseconds)
          timer(1000).subscribe(() => {
            this.store.dispatch(LoaderActions.hideLoader()); // Hide loader after 10 seconds
          });

            return TodoActions.loadTodos()
          }), // reload todos after adding
          catchError((error) => {
            this.store.dispatch(LoaderActions.hideLoader()); // Hide loader when an error occurs
            return of(TodoActions.loadTodosFailure({ error }));
          })
        )
      )
    )
  );




    this.updateTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.updateTodo),
      mergeMap((action) =>
        this.todoService.updateTodo(action.todo).pipe(
          map((todo) => TodoActions.loadTodos()), // reload todos after updating
          catchError(async (error) => TodoActions.loadTodosFailure({ error }))
        )
      )
    )
  );

  this.deleteTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.deleteTodo),
      mergeMap((action) =>
        this.todoService.deleteTodo(action.id).pipe(
          map(() => TodoActions.loadTodos()), // reload todos after deletion
          catchError(async (error) => TodoActions.loadTodosFailure({ error }))
        )
      )
    )
  );



  }



    // Similar for Add, Update, and Delete Todos with Loader and Toaster

  
}
