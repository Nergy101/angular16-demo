import { Injectable, WritableSignal, effect, signal } from '@angular/core';
import { Test } from '../components/signals-input-component/models/test';

@Injectable({
  providedIn: 'root',
})
export class SignalService {
  test: WritableSignal<Test> = signal({ name: 'Christian', age: 24 });

  constructor() {
    effect(() => {
      console.table(this.test());
    });
  }
}
