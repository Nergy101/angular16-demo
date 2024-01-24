import { Component, OnInit, input } from '@angular/core';
import { Test } from '../../signals-input-component/models/test';

@Component({
  selector: 'app-defered-component',
  standalone: true,
  imports: [],
  templateUrl: './defered-component.component.html',
  styleUrl: './defered-component.component.scss',
})
export class DeferedComponentComponent implements OnInit {
  items: any[] = [];
  integer = 5;

  ngOnInit(): void {
    setTimeout(() => {
      this.items = [1, 2, 3, 4, 5];
    }, 3000);
  }
}
