import * as url from 'url';
import fetch from 'node-fetch';
import { Observable } from 'rxjs';

import { Action } from '../../models/action';
import { Updater } from '../../models/updater';

import { is } from '../../actions/request-spot-index';
import { Token } from '../../models/token';

export default function updater$(
  action$: Observable<Action<any>>,
  reaction: (action: Action<any>) => void
): Observable<Updater<Token>> {
  return action$
    .filter(is)
    .mergeMap(({ params: { token, stampRallyId } }) => {
      const urlObj = url.parse(
        'https://api.rallyapp.jp/stamp_rallies/' + stampRallyId + '/spots'
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
    .map(({ spots }: any) => (): Token => {
      return spots;
    });
}
