import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { todoReducer } from './todos/todo.reducer';
import { TodoEffects } from './todos/todo.effects';
import { loaderReducer } from './todos/loader.reducer';
import { ToastrModule } from 'ngx-toastr';
import { TodoService } from './todos/todo.service';
import { TodoListComponent } from './todos/todo-list/todo-list.component';

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent
    // Declare your components here
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    HttpClientModule,
    StoreModule.forRoot({ todos: todoReducer, loader:loaderReducer }),
    EffectsModule.forRoot([TodoEffects]),
    // EffectsModule.forFeature ([TodoEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25 }) // Optional
  ],
  providers: [TodoService],
  bootstrap: [AppComponent]
})
export class AppModule {}
