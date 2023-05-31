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
export class SignalComponent implements OnDestroy {
  count = signal(0);
  doubleCount = computed(() => this.count() * 2);

  doubleCount$ = toObservable(this.doubleCount);

  name = signal('Christian');

  firstName = signal('Jane');
  lastName = signal('Doe');
  fullName = computed(() => `${this.firstName()} ${this.lastName()}`);
  nameChangeEffect = effect(() => console.log('Name changed:', this.name()));

  destroy$ = new Subject<void>();

  constructor() {
    // New
    effect(() => console.log('(new) Double is now:', this.doubleCount()));

    // Old
    this.doubleCount$
      .pipe(takeUntilDestroyed()) // new: takeUntilDestroyed
      // .pipe(takeUntil(this.destroy$)) // old way
      .subscribe((value) => console.log('(old) Double is now:', value));

    // cleanup
    effect((onCleanup) => {
      console.log('Name changed to', this.name);
      onCleanup(() => console.log('cleaned up effect!'));
    });
  }

  // old way
  ngOnDestroy(): void {
    this.destroy$.next();
  }

  setName(newName: string): void {
    this.firstName.set(newName);
  }

  increment(): void {
    this.count.update((current) => current + 1);
  }

  onNameChange(newVal: string) {
    this.name.set(newVal);
  }
}
