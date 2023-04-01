import { style, transition, animate, trigger } from '@angular/animations';
import { Component } from '@angular/core';

const enterTransition = transition(':enter', [
  style({
    transform: 'translateX(100%)',
    opacity: 0,
  }),
  animate('400ms ease-in', style({ transform: 'translateX(0)', opacity: 1 })),
]);

const exitTransition = transition(':leave', [
  style({
    transform: 'translateX(0)',
    opacity: 1,
  }),
  animate(
    '400ms ease-out',
    style({ transform: 'translateX(100%)', opacity: 0 })
  ),
]);

const slideIn = trigger('slideIn', [enterTransition]);
const slideOut = trigger('slideOut', [exitTransition]);

@Component({
  selector: 'page-slide',
  templateUrl: './page-slide.component.html',
  styleUrls: ['./page-slide.component.css'],
  animations: [slideIn, slideOut],
})
export class PageSlideComponent {
  open = false;

  slide() {
    this.open = !this.open;
  }
}
