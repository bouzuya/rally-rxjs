import * as url from 'url';
import fetch from 'node-fetch';
import { Observable } from 'rxjs';

import { Action } from '../../models/action';
import { Updater } from '../../models/updater';

import { StampRally } from '../../models/stamp-rally';

export default function updater$(
  action$: Observable<Action>,
  reaction: (action: Action) => void
): Observable<Updater<StampRally[]>> {
  return action$
    .filter(({ type }) => type === 'request-stamp-rally-index')
    .mergeMap(({ params: { token, userId } }) => {
      const urlObj = url.parse(
        'https://api.rallyapp.jp/users/' + userId + '/stamp_rallies'
      );
      urlObj.query = { view_type: 'admin' };
      return Observable.fromPromise(fetch(
        url.format(urlObj),
        {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Authorization': 'Token token="' + token + '"',
            'Content-Type': 'application/json'
          }
        }
      ));
    })
    .mergeMap((response: any) => response.json())
    .map(({ stampRallies }: any) => () => {
      return stampRallies;
    });
}
