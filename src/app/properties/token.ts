import { Observable } from 'rxjs';

import { Action } from '../models/action';
import { Updater } from '../models/updater';

import { Token } from '../models/token';
import fetchStampRallyList$ from './token/fetch-stamp-rally-list';
import reset$ from './token/reset';

export default function property(
  state: Token,
  action$: Observable<Action>,
  reaction: (action: Action) => void
): Observable<Token> {
  return Observable
    .of(state)
    .merge(
      fetchStampRallyList$(action$, reaction),
      reset$(action$, reaction)
    )
    .scan((state: Token, updater: Updater<Token>) => {
      return updater(state);
    });
};
