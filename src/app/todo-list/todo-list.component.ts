import { Component, OnInit } from '@angular/core';
import { TodoService } from '../shared/services/todo.service';
import { FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  items: string[] = [];
  todoControl!: FormControl;
  listName = 'My Todo List';
  showDialog = false;

  constructor(private todoService: TodoService, private fb: FormBuilder) {
    this.todoControl = this.fb.control(undefined);
  }

  ngOnInit(): void {}

  openDialog() {
    this.showDialog = true;
  }

  addItem() {
    const item = this.todoControl.value;

    if (!item) {
      this.todoService.showEmptyInputError();
      return;
    }

    if (!this.todoService.checkIfExists(item, this.items)) {
      this.items.push(item);
    } else {
      this.todoService.showExistsError();
    }

    this.todoControl.reset();
  }

  removeItem(i: number) {
    this.items.splice(i, 1);
  }

  showEmptyInputError() {
    this.todoService.showEmptyInputError();
  }
}
