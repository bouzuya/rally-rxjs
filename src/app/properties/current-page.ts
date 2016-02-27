
import { Observable } from 'rxjs';
import { Action } from '../../framework/action';
import { from as route$ } from '../../framework/route-action';

import { Updater } from '../models/updater';

export default function property(
  state: string,
  action$: Observable<Action<any>>
): Observable<string> {
  return Observable
    .of(state)
    .merge(route$(action$).map(({ name }) => () => name))
    .scan((state: string, updater: Updater<string>) => {
      return updater(state);
    });
};
