import { ComponentFixture } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

export function findEl<T>(
  fixture: ComponentFixture<T>,
  testId: string
): DebugElement {
  return fixture.debugElement.query(By.css(`[data-testid="${testId}"]`));
}

export function findComponent<T>(
  fixture: ComponentFixture<T>,
  selector: string
): DebugElement {
  return fixture.debugElement.query(By.css(selector));
}

export function generateRandomString(length = 6): string {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export function generateRandomNumber(length = 6): number {
  const characters = '0123456789';
  let result = 0;
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += parseInt(
      characters.charAt(Math.floor(Math.random() * charactersLength))
    );
  }
  return result;
}
