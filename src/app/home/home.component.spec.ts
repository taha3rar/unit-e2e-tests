import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { findEl } from '../shared/helpers/test.helper';
import { ButtonModule } from 'primeng/button';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [ButtonModule],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct header', () => {
    const h1 = findEl(fixture, 'title').nativeElement;
    expect(h1.textContent).toEqual('Home');
  });

  it('should display the correct button', () => {
    const button = findEl(fixture, 'todo-routing-button').nativeElement;
    expect(button.attributes['label'].textContent).toEqual('Todo List');
  });
});
