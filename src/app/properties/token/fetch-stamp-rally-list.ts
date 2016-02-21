import fetch from 'node-fetch';
import { Observable } from 'rxjs';

import { Action } from '../../models/action';
import { Updater } from '../../models/updater';

import { Token } from '../../models/token';
import { create } from '../../actions/request-stamp-rally-index';
import { is } from '../../actions/go-to-stamp-rally-list';

export default function updater$(
  action$: Observable<Action<any>>,
  reaction: (action: Action<any>) => void
): Observable<Updater<Token>> {
  return action$
    .filter(is)
    .map(() => (token: Token) => {
      reaction(create(token));
      return token;
    });
}
