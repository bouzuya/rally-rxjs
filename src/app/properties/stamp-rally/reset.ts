import * as url from 'url';
import fetch from 'node-fetch';
import { Observable } from 'rxjs';

import { Action } from '../../models/action';
import { Updater } from '../../models/updater';

import { is } from '../../actions/request-stamp-rally-show';
import { create } from '../../actions/success-stamp-rally-show';
import { StampRally } from '../../models/stamp-rally';

export default function updater$(
  action$: Observable<Action<any>>,
  reaction: (action: Action<any>) => void
): Observable<Updater<StampRally>> {
  return action$
    .filter(is)
    .mergeMap(({ params: { token, stampRallyId } }) => {
      const urlObj = url.parse(
        'https://api.rallyapp.jp/stamp_rallies/' + stampRallyId
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
    .map((stampRally: any) => () => {
      reaction(create());
      return stampRally;
    });
}
