import { Observable } from 'rxjs';

import { Action } from '../models/action';
import { Updater } from '../models/updater';

import { StampRally } from '../models/stamp-rally';
import reset$ from './stamp-rallies/reset';

export default function users$(
  state: StampRally[],
  action$: Observable<Action<any>>,
  reaction: (action: Action<any>) => void
): Observable<StampRally[]> {
  return Observable
    .of(state)
    .merge(
      reset$(action$, reaction)
    )
    .scan((users: StampRally[], updater: Updater<StampRally[]>) => {
      return updater(users);
    });
};

