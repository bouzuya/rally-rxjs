import fetch from 'node-fetch';
import { Observable } from 'rxjs';

import { Action } from '../../models/action';
import { Updater } from '../../models/updater';

import { Token } from '../../models/token';

export default function updater$(
  action$: Observable<Action>,
  reaction: (action: Action) => void
): Observable<Updater<Token>> {
  return action$
    .filter(({ type }) => type === 'go-to-stamp-rally-list')
    .map(() => (token: Token) => {
      reaction({
        type: 'request-stamp-rally-index',
        params: token
      });
      return token;
    });
}
