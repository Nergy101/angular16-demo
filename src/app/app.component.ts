import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SignalComponent } from './components/signals-component/signals-component.component';
import { DeferComponentComponent } from './components/defer-component/defer-component.component';
import { Test } from './components/signals-input-component/models/test';
import { SignalsInputComponentComponent } from './components/signals-input-component/signals-input-component.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    RouterOutlet,
    SignalComponent,
    DeferComponentComponent,
    SignalsInputComponentComponent,
  ],
})
export class AppComponent {
  title = 'angular16-demo';
}
