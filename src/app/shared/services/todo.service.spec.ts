import { TestBed } from '@angular/core/testing';
import { MessageService } from 'primeng/api';
import { TodoService } from './todo.service';

describe('TodoService', () => {
  let service: TodoService;
  let messageService: MessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TodoService, MessageService],
    });
    service = TestBed.inject(TodoService);
    messageService = TestBed.inject(MessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('checkIfExists', () => {
    it('should return true if item exists in items array', () => {
      const item = 'item1';
      const items = ['item1', 'item2', 'item3'];
      const result = service.checkIfExists(item, items);
      expect(result).toBe(true);
    });

    it('should return false if item does not exist in items array', () => {
      const item = 'item4';
      const items = ['item1', 'item2', 'item3'];
      const result = service.checkIfExists(item, items);
      expect(result).toBe(false);
    });
  });

  describe('showExistsError', () => {
    it('should call messageService.add with the correct error message', () => {
      spyOn(messageService, 'add');
      service.showExistsError();
      expect(messageService.add).toHaveBeenCalledOnceWith({
        severity: 'error',
        summary: 'Error',
        detail: 'Item already exists',
        life: 2000,
      });
    });
  });

  describe('showEmptyInputError', () => {
    it('should call messageService.add with the correct error message', () => {
      spyOn(messageService, 'add');
      service.showEmptyInputError();
      expect(messageService.add).toHaveBeenCalledOnceWith({
        severity: 'error',
        summary: 'Error',
        detail: 'Input cannot be empty',
        life: 2000,
      });
    });
  });
});
