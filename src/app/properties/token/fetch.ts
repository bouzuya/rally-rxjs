import fetch from 'node-fetch';
import { Observable } from 'rxjs';

import { Action } from '../../models/action';
import { Updater } from '../../models/updater';

import { Token } from '../../models/token';
import {
  create as createStampRallyList
} from '../../actions/request-stamp-rally-index';
import {
  is as isStampRallyList
} from '../../actions/go-to-stamp-rally-list';
import {
  create as createStampRallyShow
} from '../../actions/request-stamp-rally-show';
import {
  is as isStampRallyShow
} from '../../actions/go-to-stamp-rally-show';

export default function updater$(
  action$: Observable<Action<any>>,
  reaction: (action: Action<any>) => void
): Observable<Updater<Token>> {
  const create$: Observable<(...args: any[]) => Action<any>> = Observable
    .merge(
      action$
        .filter(isStampRallyList)
        .map(() => createStampRallyList),
      action$
        .filter(isStampRallyShow)
        .map(({ params: id }) => ({ token }: Token) => {
          return createStampRallyShow(token, id);
        })
    );
  return create$
    .map(create => (token: Token) => {
      reaction(create(token));
      return token;
    });
}
