import { Observable } from 'rxjs';

import { Action } from '../models/action';
import { Updater } from '../models/updater';

import { Token } from '../models/token';
import reset$ from './token/reset';

export default function property(
  state: Token,
  action$: Observable<Action<any>>
): Observable<Token> {
  return Observable
    .of(state)
    .merge(
      reset$(action$)
    )
    .scan((state: Token, updater: Updater<Token>) => {
      return updater(state);
    });
};
