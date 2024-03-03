import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit-list-name',
  templateUrl: './edit-list-name.component.html',
  styleUrls: ['./edit-list-name.component.scss'],
})
export class EditListNameComponent {
  @Input() showDialog!: boolean;
  @Input() listName!: string;

  @Output() showDialogChange = new EventEmitter<boolean>();
  @Output() listNameChange = new EventEmitter<string>();
  @Output() emptyName = new EventEmitter();

  nameControl = new FormControl();

  changed(visibility: boolean) {
    this.showDialogChange.emit(visibility);
  }

  saveName() {
    const newName = this.nameControl.value;
    if (!newName) {
      this.emptyName.emit();
      return;
    }
    this.listName = newName;
    this.listNameChange.emit(this.listName);
    this.changed(false);
  }
}


