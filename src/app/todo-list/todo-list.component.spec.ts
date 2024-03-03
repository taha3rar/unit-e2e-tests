import { TodoListComponent } from './todo-list.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  findComponent,
  findEl,
  generateRandomString,
} from '../shared/helpers/test.helper';
import { MessageService } from 'primeng/api';
import { TodoService } from '../shared/services/todo.service';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { EditListNameComponent } from '../edit-list-name/edit-list-name.component';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let todoService: TodoService;
  let editListDebugElement: DebugElement;
  let editListComponent: EditListNameComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoListComponent, EditListNameComponent],
      imports: [ButtonModule, ReactiveFormsModule, ToastModule],
      providers: [TodoService, MessageService],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    todoService = TestBed.inject(TodoService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('addItem', () => {
    it('should add an item to items array', () => {
      spyOn(todoService, 'showEmptyInputError');
      spyOn(todoService, 'showExistsError');
      spyOn(todoService, 'checkIfExists').and.returnValue(false);
      const item = generateRandomString();
      component.todoControl.setValue(item);
      const button = findEl(fixture, 'add-item-button');
      button.triggerEventHandler('onClick');
      fixture.detectChanges();

      const li = findEl(fixture, 'todo-item-0');

      expect(li.nativeElement.textContent).toContain(item);
      expect(todoService.checkIfExists).toHaveBeenCalledOnceWith(
        item,
        component.items
      );
      expect(todoService.showEmptyInputError).not.toHaveBeenCalled();
      expect(todoService.showExistsError).not.toHaveBeenCalled();
      expect(component.items).toContain(item);
    });

    it('should fail to add item because item already exists', () => {
      spyOn(todoService, 'showEmptyInputError');
      spyOn(todoService, 'showExistsError');
      spyOn(todoService, 'checkIfExists').and.returnValue(true);
      const item = generateRandomString();
      component.todoControl.setValue(item);
      const button = findEl(fixture, 'add-item-button');
      button.triggerEventHandler('onClick');
      expect(todoService.checkIfExists).toHaveBeenCalledOnceWith(
        item,
        component.items
      );
      expect(todoService.showEmptyInputError).not.toHaveBeenCalled();
      expect(todoService.showExistsError).toHaveBeenCalledTimes(1);
      expect(component.items).not.toContain(item);
    });

    it('should fail to add item because input is empty', () => {
      const button = findEl(fixture, 'add-item-button');
      spyOn(todoService, 'showEmptyInputError');
      spyOn(todoService, 'checkIfExists');

      button.triggerEventHandler('onClick');

      expect(todoService.showEmptyInputError).toHaveBeenCalledTimes(1);
      expect(todoService.checkIfExists).not.toHaveBeenCalled();
      expect(component.items.length).toEqual(0);
    });
  });

  describe('removeItem', () => {
    it('should remove an item from the list', () => {
      spyOn(component, 'removeItem').and.callThrough();
      const item = generateRandomString();
      component.todoControl.setValue(item);
      const addButton = findEl(fixture, 'add-item-button');
      addButton.triggerEventHandler('onClick');
      fixture.detectChanges();

      const removeButton = findEl(fixture, `remove-item-${0}`);
      removeButton.triggerEventHandler('onClick');
      fixture.detectChanges();
      const li = findEl(fixture, 'todo-item-0');

      expect(li).toBeFalsy();
      expect(component.removeItem).toHaveBeenCalledOnceWith(0);
      expect(component.items).not.toContain(item);
    });
  });

  describe('EditListNameComponent', () => {
    beforeEach(() => {
      editListDebugElement = findComponent(fixture, 'app-edit-list-name');
      editListComponent = editListDebugElement.componentInstance;
    });

    it('should display the correct list name', () => {
      const randomName = generateRandomString();
      component.listName = randomName;
      fixture.detectChanges();
      expect(editListComponent.listName).toEqual(randomName);
    });

    it('should display the correct dialog visibility', () => {
      component.showDialog = true;
      fixture.detectChanges();
      expect(editListComponent.showDialog).toEqual(true);
    });

    it('should change the dialog visibility based on output', () => {
      editListDebugElement.triggerEventHandler('showDialogChange', true);
      fixture.detectChanges();
      expect(component.showDialog).toEqual(true);
    });

    it('should change the list name based on output', () => {
      const randomName = generateRandomString();
      editListDebugElement.triggerEventHandler('listNameChange', randomName);
      fixture.detectChanges();
      expect(component.listName).toEqual(randomName);
    });

    it('should emit emptyName', () => {
      spyOn(component, 'showEmptyInputError');

      editListDebugElement.triggerEventHandler('emptyName', undefined);
      fixture.detectChanges();
      expect(component.showEmptyInputError).toHaveBeenCalledTimes(1);
    });

    it('should save the list name', () => {
      const randomName = generateRandomString();
      editListComponent.nameControl.setValue(randomName);
      spyOn(component, 'showEmptyInputError');
      spyOn(editListComponent, 'changed');
      editListComponent.saveName();
      expect(component.listName).toEqual(randomName);
      expect(editListComponent.changed).toHaveBeenCalledOnceWith(false);
    });
  });
});
