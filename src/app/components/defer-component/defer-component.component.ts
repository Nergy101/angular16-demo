import { Component, inject } from '@angular/core';
import { DeferedComponentComponent } from './defered-component/defered-component.component';
import { Test } from '../signals-input-component/models/test';
import { SignalService } from 'src/app/services/signal-service.service';

@Component({
  selector: 'app-defer-component',
  standalone: true,
  templateUrl: './defer-component.component.html',
  styleUrl: './defer-component.component.scss',
  imports: [DeferedComponentComponent],
})
export class DeferComponentComponent {
  private signalService = inject(SignalService);

  changeSignalService(): void {
    this.signalService.test.set({ name: '@DevTalks', age: 5 });
  }
}
