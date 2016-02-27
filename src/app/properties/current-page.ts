
import { Observable } from 'rxjs';
import { Action } from '../../framework/action';
import { is } from '../../framework/route-action';

import { Updater } from '../models/updater';

export default function property(
  state: string,
  action$: Observable<Action<any>>
): Observable<string> {
  return Observable
    .of(state)
    .merge(action$.filter(is).map(({ params: { name } }) => () => name))
    .scan((state: string, updater: Updater<string>) => {
      return updater(state);
    });
};
