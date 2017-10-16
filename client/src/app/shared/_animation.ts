import { AnimationEntryMetadata } from '@angular/core';
import { animate, style, trigger, keyframes, transition, state } from '@angular/animations';

export const fadeInUpAnimation: AnimationEntryMetadata =
  trigger('routerAnimation', [
    state('*',style({
        opacity: 1,
        transform: 'none'
    })),
    transition(':enter', [
      animate('400ms ease-in', keyframes([
        style({opacity: 0, transform: 'translate3d(0, 40%, 0)', offset: 0}),
        style({opacity: 0.7, transform: 'translate3d(0, 10px, 0)', offset: 0.7}),
        style({opacity: 1, transform: 'none', offset: 1}),
      ])),
    ]),
    transition(':leave', [
      animate('400ms ease-out', keyframes([
        style({opacity: 1, transform: 'none', offset: 0}),
        style({opacity: 0.4, transform: 'translate3d(0, -10%, 0)', offset: 0.4}),
        style({opacity: 0, transform: 'translate3d(0, -40%, 0)', offset: 1}),
      ])),
    ])
  ]);
