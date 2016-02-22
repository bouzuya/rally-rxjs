import { Observable } from 'rxjs';

import { Action } from '../models/action';
import { Updater } from '../models/updater';

import { Token } from '../models/token';
import fetch$ from './token/fetch';
import reset$ from './token/reset';

export default function property(
  state: Token,
  action$: Observable<Action<any>>,
  reaction: (action: Action<any>) => void
): Observable<Token> {
  return Observable
    .of(state)
    .merge(
      fetch$(action$, reaction),
      reset$(action$, reaction)
    )
    .scan((state: Token, updater: Updater<Token>) => {
      return updater(state);
    });
};
