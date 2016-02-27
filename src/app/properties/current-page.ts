
import { Observable } from 'rxjs';
import { Action } from '../../framework/action';
import { filter as routeAction } from '../../framework/route-action';

import { Updater } from '../models/updater';

export default function property(
  state: string,
  action$: Observable<Action<any>>
): Observable<string> {
  return Observable
    .of(state)
    .merge(routeAction(action$).map(({ name }) => () => name))
    .scan((state: string, updater: Updater<string>) => {
      return updater(state);
    });
};
