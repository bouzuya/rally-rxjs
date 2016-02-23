import { Observable } from 'rxjs';

import { Action } from '../../models/action';
import { Updater } from '../../models/updater';

import { Token } from '../../models/token';
import {
  create as createStampRallyIndex
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
import {
  create as createSpotIndex
} from '../../actions/request-spot-index';

export default function updater$(
  action$: Observable<Action<any>>,
  reaction: (action: Action<any>) => void
): Observable<Updater<Token>> {
  const create$: Observable<(...args: any[]) => Action<any>> = Observable
    .merge(
      action$
        .filter(isStampRallyList)
        .map(() => createStampRallyIndex),
      action$
        .filter(isStampRallyShow)
        .map(({ params: id }) => ({ token }: Token) => {
          return createStampRallyShow(token, id);
        }),
      action$
        .filter(isStampRallyShow)
        .map(({ params: id }) => ({ token }: Token) => {
          return createSpotIndex(token, id);
        })
    );
  return create$
    .map(create => (token: Token) => {
      reaction(create(token));
      return token;
    });
}
