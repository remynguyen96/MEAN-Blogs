import { AnimationEntryMetadata } from '@angular/core';
import { animate, style, trigger, keyframes, transition, state } from '@angular/animations';

export const authAnimation : AnimationEntryMetadata =
  trigger('authRouting', [
    state('*',style({
        opacity: 1,
        transform: 'translate3d(0, 0, 0)'
    })),
    transition('void => *',[
      animate('400ms ease-in', keyframes([
        style({opacity: 0, transform: ' translate3d(-40px, 0, 0)', offset: 0}),
        style({opacity: 0.7, transform: ' translate3d(-5px, 0, 0)', offset: 0.7}),
        style({opacity: 1, transform: 'translate3d(0, 0, 0)', offset: 1})
      ]))
    ]),
    transition('* => void', [
      animate('400ms ease-out', keyframes([
        style({opacity: 1, transform: 'translate3d(0, 0, 0)', offset: 0}),
        style({opacity: 0.4, transform: 'translate3d(30px, 0, 0)', offset: 0.4}),
        style({opacity: 0, transform: 'translate3d(40px, 0, 0)', offset: 1}),
      ]))
    ])
  ]);
