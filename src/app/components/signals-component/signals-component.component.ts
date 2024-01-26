import {
  ChangeDetectionStrategy,
  Component,
  Input,
  computed,
  effect,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  takeUntilDestroyed,
  toObservable,
  toSignal,
} from '@angular/core/rxjs-interop';
import { Observable, debounceTime, interval, tap } from 'rxjs';
import { FormsModule } from '@angular/forms';

//* standalone components can directly import modules, components, etc.
//* Angular checks OnPush components when the async pipes or signals provide a new value
@Component({
  selector: 'signal-component',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './signals-component.component.html',
  styleUrls: ['./signals-component.component.scss'],
  imports: [CommonModule, FormsModule],
})
export class SignalComponent {
  //! old way: implements OnDestroy
  //* create a property that's a signal
  count = signal(0);

  name = signal('Christian');

  company = signal({
    name: 'Cloud Republic',
    shortName: 'CR',
  });

  todos = signal([
    {
      id: 1,
      title: 'Very important',
    },
    {
      id: 2,
      title: 'Not important',
    },
  ]);

  //* We can make computed signals from other signals, which update whenever the dependencies (in this case: `this.count`) change
  doubleCount = computed(() => this.count() * 2);

  //* We can make observables from signals, to use rxjs operators on them
  doubleCount$ = toObservable(this.doubleCount);

  //* We can make observables from signals, to use rxjs operators on them
  name$ = toObservable(this.name);

  firstName = signal('Jane');
  lastName = signal('Doe');
  fullName = computed(() => `${this.firstName()} ${this.lastName()}`);

  nameChangeEffect = effect(() => console.log('Name changed:', this.name()));
  companyChangeEffect = effect(() => console.log(this.company()));

  //! old OnDestroy way
  //! destroy$ = new Subject<void>();

  constructor() {
    //* We can make observables from signals, to use rxjs operators on them
    this.name$
      .pipe(
        debounceTime(1000),
        tap((val) => console.log('Debounced name changed:', val)),
        takeUntilDestroyed()
      )
      .subscribe();

    //? Old reactivity with subscribe on observables
    this.doubleCount$
      .pipe(takeUntilDestroyed()) //* new way
      //! .pipe(takeUntil(this.destroy$))  // old way
      .subscribe((value) => console.log('(rxjs) Double is now:', value));

    //? New reactivity with effects on signals
    effect(() => console.log('(signals) Double is now:', this.doubleCount()));

    //* cleanup of effects
    effect((onCleanup) => {
      onCleanup(() => {
        //* used for cleaning up resources like timers, or other managed resources, etc.
        //* console.log('cleaned up effect!');
      });
    });

    //* Showcase of a RxJs observable to a signal with: `toSignal`
    const seconds$ = interval(10000);
    const seconds = toSignal(seconds$, { initialValue: 0 });
    effect(() => {
      console.warn(`RxJs observable: ${seconds() * 10} seconds have passed`);
    });
  }

  //! old OnDestroy way
  //! ngOnDestroy(): void {
  //!   this.destroy$.next();
  //! }

  //* set new signal value
  setName(newName: string): void {
    this.firstName.set(newName);
  }

  //* update signal value (using current value)
  increment(): void {
    this.count.update((current) => current + 1);
  }

  //* mutate signal value in-place (for objects and arrays)
  onCompanyNameChange(newName: string): void {
    this.company.update((current) => (current = { ...current, name: newName }));
  }

  deleteTodo(todoId: number): void {
    this.todos.update((_todos) => {
      return _todos.filter((x) => x.id != todoId);
    });
  }
}
