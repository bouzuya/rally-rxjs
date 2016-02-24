import { Observable } from 'rxjs';

import { Action } from '../../models/action';
import { Updater } from '../../models/updater';

import { Token } from '../../models/token';
import { create } from '../../actions/request';
import {
  is as isStampRallyList
} from '../../actions/go-to-stamp-rally-list';
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
        .map(() => ({ token, userId }: Token) => {
          return create('stamp-rally-index', { token, userId });
        }),
      action$
        .filter(isStampRallyShow)
        .map(({ params: stampRallyId }) => ({ token }: Token) => {
          return create('stamp-rally-show', { token, stampRallyId });
        }),
      action$
        .filter(isStampRallyShow)
        .map(({ params: stampRallyId }) => ({ token }: Token) => {
          return create('spot-index', { token, stampRallyId });
        })
    );
  return create$
    .map(create => (token: Token) => {
      reaction(create(token));
      return token;
    });
}
