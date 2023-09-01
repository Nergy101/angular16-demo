import { Component, OnDestroy, computed, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { Subject } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'signal-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signals-component.component.html',
  styleUrls: ['./signals-component.component.scss'],
})
export class SignalComponent { // old way: implements OnDestroy
  count = signal(0);
  doubleCount = computed(() => this.count() * 2);

  doubleCount$ = toObservable(this.doubleCount);

  name = signal('Christian');

  firstName = signal('Jane');
  lastName = signal('Doe');
  fullName = computed(() => `${this.firstName()} ${this.lastName()}`);
  nameChangeEffect = effect(() => console.log('Name changed:', this.name()));

  // old OnDestroy way
  // destroy$ = new Subject<void>();

  constructor() {
    // Old reactivity with subscribe()
    this.doubleCount$
      .pipe(takeUntilDestroyed())         // new way: `takeUntilDestroyed()`, a magic function that will unsubscribe for you
      // .pipe(takeUntil(this.destroy$))  // old way
      .subscribe((value) => console.log('(old) Double is now:', value));

    // New reactivity with effects
    effect(() => console.log('(new) Double is now:', this.doubleCount()));


    // cleanup
    effect((onCleanup) => {
      console.log('Name changed to', this.name());
      onCleanup(() => {
        // used for cleaning up resources like timers, or other managed resources, etc.
        console.log('cleaned up effect!');
      });
    });
  }

  // old OnDestroy way
  // ngOnDestroy(): void {
  //   this.destroy$.next();
  // }

  // set new signal value
  setName(newName: string): void {
    this.firstName.set(newName);
  }

  // update signal value (with current value)
  increment(): void {
    this.count.update((current) => current + 1);
  }

  // set new signal value
  onNameChange(newName: string) {
    this.name.set(newName);
  }
}
