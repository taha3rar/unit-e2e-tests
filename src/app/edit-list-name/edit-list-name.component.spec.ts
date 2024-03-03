import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditListNameComponent } from './edit-list-name.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { generateRandomString } from '../shared/helpers/test.helper';

describe('EditListNameComponent', () => {
  let component: EditListNameComponent;
  let fixture: ComponentFixture<EditListNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditListNameComponent],
      imports: [ReactiveFormsModule, DialogModule, ButtonModule],
    }).compileComponents();

    fixture = TestBed.createComponent(EditListNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('changed', () => {
    it('should emit the visibility', () => {
      spyOn(component.showDialogChange, 'emit');
      component.changed(true);
      expect(component.showDialogChange.emit).toHaveBeenCalledOnceWith(true);
    });
  });

  describe('saveName', () => {
    it('should save the name', () => {
      spyOn(component.listNameChange, 'emit');
      spyOn(component, 'changed');
      const newName = generateRandomString();
      component.nameControl.setValue(newName);
      component.saveName();
      expect(component.listNameChange.emit).toHaveBeenCalledOnceWith(newName);
      expect(component.changed).toHaveBeenCalledOnceWith(false);
    });

    it('should emit emptyName', () => {
      spyOn(component.emptyName, 'emit');
      component.nameControl.setValue('');
      component.saveName();
      expect(component.emptyName.emit).toHaveBeenCalledOnceWith();
    });
  });
});
