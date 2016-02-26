import { Observable } from 'rxjs';
import { Action } from '../../framework/action';

import { Updater } from '../models/updater';

import { Spot } from '../models/spot';
import reset$ from './spots/reset';

export default function property(
  state: Spot[],
  action$: Observable<Action<any>>
): Observable<Spot[]> {
  return Observable
    .of(state)
    .merge(
      reset$(action$)
    )
    .scan((state: Spot[], updater: Updater<Spot[]>) => {
      return updater(state);
    });
};
