import fetch from 'node-fetch';
import { Observable } from 'rxjs';

import { Action } from '../../models/action';
import { Updater } from '../../models/updater';

import { Token } from '../../models/token';

export default function updater$(
  action$: Observable<Action<any>>,
  reaction: (action: Action<any>) => void
): Observable<Updater<Token>> {
  return action$
    .filter(({ type }) => type === 'request-sign-in')
    .mergeMap(({ params: { email, password } }) => {
      return Observable.fromPromise(fetch(
        'https://api.rallyapp.jp/tokens',
        {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email, password
          })
        }
      ));
    })
    .mergeMap((response: any) => response.json())
    .map((json: any) => (): Token => {
      reaction({ type: 'success-sign-in', params: {} });
      return { token: json.token, userId: json.userId };
    });
}
