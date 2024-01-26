import { Component, input } from '@angular/core';
import { Test } from '../models/test';

@Component({
  selector: 'signal-input-demo-component',
  standalone: true,
  imports: [],
  templateUrl: './signals-input-demo-component.component.html',
  styleUrl: './signals-input-demo-component.component.scss',
})
export class SignalsInputDemoComponentComponent {
  myInput = input.required<Test>();
}
