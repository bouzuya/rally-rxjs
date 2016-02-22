import { Observable } from 'rxjs';

import { Action } from '../models/action';
import { Updater } from '../models/updater';

import { StampRally } from '../models/stamp-rally';
import reset$ from './stamp-rally/reset';

export default function stampRally$(
  state: StampRally,
  action$: Observable<Action<any>>,
  reaction: (action: Action<any>) => void
): Observable<StampRally> {
  return Observable
    .of(state)
    .merge(
      reset$(action$, reaction)
    )
    .scan((state: StampRally, updater: Updater<StampRally>) => {
      return updater(state);
    });
};

