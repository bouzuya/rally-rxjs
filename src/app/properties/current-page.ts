
import { Observable } from 'rxjs';

import { Action } from '../models/action';
import { Updater } from '../models/updater';

import reset$ from './current-page/reset';

export default function property(
  state: string,
  action$: Observable<Action<any>>
): Observable<string> {
  return Observable
    .of(state)
    .merge(
      reset$(action$)
    )
    .scan((state: string, updater: Updater<string>) => {
      return updater(state);
    });
};
