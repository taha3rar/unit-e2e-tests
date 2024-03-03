import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';

import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoService } from './shared/services/todo.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { EditListNameComponent } from './edit-list-name/edit-list-name.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, TodoListComponent, EditListNameComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ToastModule,
    DialogModule,
    ButtonModule,
    ReactiveFormsModule,
  ],
  providers: [TodoService, MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
