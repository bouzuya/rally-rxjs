import fetch from 'node-fetch';
import { Observable } from 'rxjs';

import { Action } from '../../models/action';
import { Updater } from '../../models/updater';

import { is } from '../../actions/response-token-create';
import { create } from '../../actions/success-sign-in';
import { Token } from '../../models/token';

export default function updater$(
  action$: Observable<Action<any>>,
  reaction: (action: Action<any>) => void
): Observable<Updater<Token>> {
  return action$
    .filter(is)
    .map(({ params: token }) => (): Token => {
      reaction(create());
      return token;
    });
}
