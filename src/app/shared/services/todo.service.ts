import { Injectable } from '@angular/core';
import { Message, MessageService } from 'primeng/api';

@Injectable()
export class TodoService {
  toastConfig: Partial<Message> = {
    severity: 'error',
    summary: 'Error',
    life: 2000,
  };

  constructor(private messageService: MessageService) {}

  checkIfExists(item: string, items: string[]) {
    return items.includes(item);
  }

  showExistsError() {
    this.messageService.clear();
    this.messageService.add({
      ...this.toastConfig,
      detail: 'Item already exists',
    });
  }

  showEmptyInputError() {
    this.messageService.clear();
    this.messageService.add({
      ...this.toastConfig,
      detail: 'Input cannot be empty',
    });
  }
}
