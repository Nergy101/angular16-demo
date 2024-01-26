import {
  Component,
  WritableSignal,
  inject,
  input,
  signal,
} from '@angular/core';
import { Test } from './models/test';
import { FormsModule } from '@angular/forms';
import { SignalsInputDemoComponentComponent } from './signals-input-demo-component/signals-input-demo-component.component';
import { SignalService } from 'src/app/services/signal-service.service';

@Component({
  selector: 'signal-input-component',
  standalone: true,
  templateUrl: './signals-input-component.component.html',
  styleUrl: './signals-input-component.component.scss',
  imports: [FormsModule, SignalsInputDemoComponentComponent],
})
export class SignalsInputComponentComponent {
  public signalService = inject(SignalService);
}
